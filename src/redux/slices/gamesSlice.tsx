import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IGame } from '../../models/IGame';
import { Service } from '../../API/Service';

export interface IGamesState {
    games: IGame[],
    loading: boolean,
    error: string,
    totalPages: number;
    currentPage: number;
    currentPageItems: IGame[]; 
    currentRequest: {
        controller: AbortController | undefined,
        promise: Promise<any> | undefined,
    };
}

const initialState = {
    games: [],
    loading: false,
    error: '',
    totalPages: 0,
    currentPage: 1,
    currentPageItems: [],
    currentRequest: {
        controller: undefined,
        promise: undefined,
    },
} as IGamesState;

export const fetchGames = createAsyncThunk(
    'Games/fetchGames',
    async(_, { rejectWithValue }) => {
        try {
            const controller = new AbortController();
            const promise = Service.getAllGames(controller.signal);

            const response = await promise;
            if (response.data.status === 0) {
                return rejectWithValue("Пусто");
            }
            if (!response) {
                return rejectWithValue("Loading games error!");
            }
            return response.data;
        } catch (e: any) {
            return rejectWithValue(e.message);
        }
    }
)

export const GamesSlice = createSlice({
    name: 'games',
    initialState,
    reducers: {
        nextPage: (state) => {
            if (state.currentPage < state.totalPages) {
                state.currentPage += 1;
                const startIndex = (state.currentPage - 1) * 9;
                const endIndex = startIndex + 9;
                state.currentPageItems = state.games.slice(startIndex, endIndex);
            }
        },
        previousPage: (state) => {
            if (state.currentPage > 1) {
                state.currentPage -= 1;
                const startIndex = (state.currentPage - 1) * 9;
                const endIndex = startIndex + 9;
                state.currentPageItems = state.games.slice(startIndex, endIndex);
            }
        },
        setGames: (state, action) => {
            state.games = action.payload;
            state.totalPages = Math.ceil(action.payload.length / 9);
            state.currentPageItems = action.payload.slice(0, 9);
            state.currentPage = 1;
        },
        setCurrentRequest: (state, action) => {
            if (state.currentRequest.controller) {
                state.currentRequest.controller.abort();
            }
            state.currentRequest.controller = action.payload?.controller;
            state.currentRequest.promise = action.payload?.promise;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGames.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(fetchGames.fulfilled, (state, action) => {
                state.games = action.payload;
                state.loading = false;
                state.error = '';
                state.totalPages = Math.ceil(action.payload.length / 9);
                state.currentPageItems = action.payload.slice(0, 9);
            })
            .addCase(fetchGames.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    }
})

export const { nextPage, previousPage, setCurrentRequest } = GamesSlice.actions;
export default GamesSlice.reducer;