import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Service } from '../../API/Service';
import { IGameInfo } from '../../models/IGameInfo';



export interface IGameState {
game: IGameInfo | null, 
loading: boolean,
error: string,
currentRequest: {
    controller: AbortController | undefined,
    promise: Promise<any> | undefined,
};
}

const initialState: IGameState = {
game: null, 
loading: false,
error: '',
currentRequest: {
    controller: undefined,
    promise: undefined,
},
};

interface FetchGameInfoParams {
id: number;
}

export const fetchGameInfo = createAsyncThunk(
    'GameInfo/fetchGameInfo',
    async (params: FetchGameInfoParams, { rejectWithValue }) => {
        const { id } = params;
        const controller = new AbortController();
        try {
            const savedGameInfoStr = localStorage.getItem(`gameInfo_${id}`);
            const savedTimestampStr = localStorage.getItem(`gameInfo_${id}_timestamp`);
            if (savedGameInfoStr && savedTimestampStr) {
                const savedTimestamp = parseInt(savedTimestampStr, 10);
                const currentTime = new Date().getTime();
                const timeDifference = currentTime - savedTimestamp;

                if (timeDifference <= 5 * 60 * 1000) {
                    return JSON.parse(savedGameInfoStr);
                }
            }

            const response = await Service.getGameInfo(id, controller.signal);
            if (response.data.status === 0) {
                return rejectWithValue("Пустой Список");
            }
            if (!response) {
                return rejectWithValue("Loading game error!");
            }
            const key = `gameInfo_${id}`;
            localStorage.setItem(key, JSON.stringify(response.data));

            const timestampKey = `${key}_timestamp`;
            const currentTime = new Date().getTime();
            localStorage.setItem(timestampKey, currentTime.toString());
            return response.data;
        } catch (e: any) {
            try {
                const alternativeResponse = await Service.getGameInfo(id, controller.signal);
                if (!alternativeResponse) {
                    return rejectWithValue("2 loading game error!");
                }
                return alternativeResponse.data;
            } catch (error) {
                try {
                    const thirdResponse = await Service.getGameInfo(id, controller.signal);
                    if (!thirdResponse) {
                        return rejectWithValue("3 loading game error!");
                    }
                    return thirdResponse.data;
                } catch (finalError) {
                    return rejectWithValue("All requests failed!");
                }
            }
        }
    }
)



export const GameInfoSlice = createSlice({
name: 'gameInfo',
initialState,
reducers: {
    setCurrentRequest: (state, action) => {
        if (state.currentRequest.controller) {
            state.currentRequest.controller.abort();
        }
        state.currentRequest.controller = action.payload?.controller;
        state.currentRequest.promise = action.payload?.promise;
    },
    clearGame: state => {
        state.game = null;
        state.error = '';
    }
},
extraReducers: (builder) => {
    builder
    .addCase(fetchGameInfo.pending, (state) => {
        state.loading = true;
        state.error = '';
    })
    .addCase(fetchGameInfo.fulfilled, (state, action) => {
        state.game = action.payload;
        state.loading = false;
        state.error = '';
    })
    .addCase(fetchGameInfo.rejected, (state, action) => {
        console.log("Error:", action.payload);
        state.loading = false;
        state.error = action.payload as string;
    });
},
});

export const { setCurrentRequest, clearGame } = GameInfoSlice.actions;
export default GameInfoSlice.reducer;


