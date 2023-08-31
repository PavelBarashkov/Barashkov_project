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
    sortBy: {
        value: string | null,
        data: string | null
    };
    filterCategory: {
        value: string | null,
        data: string | null
    };
    filterPlatform: {
        value: string | null,
        data: string | null
    };
    currentRequest: {
        controller: AbortController | undefined,
        promise: Promise<any> | undefined,
    };
}

interface FetchGamesFilterParams {
    sort: string | null;
    platform: string | null;
    category: string | null;
}

const initialState = {
    games: [],
    loading: false,
    error: '',
    totalPages: 0,
    currentPage: 1,
    currentPageItems: [],
    sortBy: {
        value: 'без сортировки',
        data: null
    },
    filterCategory: {
        value: 'без сортировки',
        data: null
    },
    filterPlatform: {
        value: 'без сортировки',
        data: null
    },
    currentRequest: {
        controller: undefined,
        promise: undefined,
    },
} as IGamesState;

export const fetchGames = createAsyncThunk(
    'Games/fetchGames',
    async(params: FetchGamesFilterParams, { rejectWithValue }) => {
        const { sort, platform, category } = params;
        try {
            const controller = new AbortController();
            const response = await Service.sortGames(sort, platform, category, controller.signal);
            if (response.data.status === 0 ) {
                return [];
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
        setStartPage: (state) => {
            state.currentPage = 1;
        },
        bySelected: (state, action) => {
            state.sortBy.value = action.payload.value;
            state.sortBy.data = action.payload.data;
        },
        platformSelected: (state, action) => {
            state.filterPlatform.value = action.payload.value;
            state.filterPlatform.data = action.payload.data;
        },
        categorySelected: (state, action) => {
            state.filterCategory.value = action.payload.value;
            state.filterCategory.data = action.payload.data;
        },
        setCurrentRequest: (state, action) => {
            if (state.currentRequest.controller) {
                state.currentRequest.controller.abort();
            }
            state.currentRequest.controller = action.payload?.controller;
            state.currentRequest.promise = action.payload?.promise;
        },
        upDataFilter: (state, action) => {
            const {event, dataType} = action.payload;
                const value = event.value;
                const data = event.data;
            if(dataType === 'sort') {
                state.sortBy.value = value;
                state.sortBy.data = data;
            } else if (dataType === 'platform') {
                state.filterPlatform.value = value;
                state.filterPlatform.data = data;
            } else if (dataType === 'category') {
                state.filterCategory.value = value;
                state.filterCategory.data = data;
            }
        }
        
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

export const { nextPage, previousPage, setCurrentRequest , upDataFilter, setStartPage } = GamesSlice.actions;
export default GamesSlice.reducer;