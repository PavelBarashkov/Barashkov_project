import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Service } from '../../API/Service';
import { IGameInfo } from '../../models/IGameInfo';

export const getSavedGameInfoFromLocalStorage = (): IGameInfo | null => {
    const savedGameInfoStr = localStorage.getItem('gameInfo');
    const savedTimestampStr = localStorage.getItem('gameInfo_timestamp');
    if (savedGameInfoStr && savedTimestampStr) {
      const savedGameInfo = JSON.parse(savedGameInfoStr);
      const savedTimestamp = parseInt(savedTimestampStr, 10);
      const currentTime = new Date().getTime();
      const timeDifference = currentTime - savedTimestamp;
  
      if (timeDifference <= 5 * 60 * 1000) {
        return savedGameInfo;
      }
    }
  
    return null;
  };
  

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
  game: getSavedGameInfoFromLocalStorage(), 
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
  async (params: FetchGameInfoParams, { rejectWithValue, dispatch }) => {
    const { id } = params;
    try {
      const controller = new AbortController();
      const response = await Service.getGameInfo(id, controller.signal);
      if (response.data.status === 0) {
        return rejectWithValue("Пусто");
      }
      if (!response) {
        return rejectWithValue("Loading game error!");
      }
      const key = 'gameInfo';
      localStorage.setItem(key, JSON.stringify(response.data));
      localStorage.setItem(`${key}_timestamp`, new Date().getTime().toString());
      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

export const GameInfoSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
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
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCurrentRequest } = GameInfoSlice.actions;
export default GameInfoSlice.reducer;
