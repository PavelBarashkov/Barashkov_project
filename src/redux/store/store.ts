import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import gamesSlice from '../slices/gamesSlice';
import gameFilterSlice from '../slices/gameFilterSlice';
import gameInfoSlice from '../slices/gameInfoSlice';

export const store = configureStore({
  reducer: {
    games: gamesSlice,
    filter: gameFilterSlice,
    gameInfo: gameInfoSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
