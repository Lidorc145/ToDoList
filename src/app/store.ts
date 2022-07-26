import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import missionReducer from '../features/mission/missionSlice';

export const store = configureStore({
  reducer: missionReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
