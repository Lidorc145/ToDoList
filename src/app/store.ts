import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import missionReducer from '../features/mission/missionSlice';
import modalReducer from '../features/modal/modalSlice';


export const store = configureStore({
    reducer: {missionReducer, modalReducer},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>;
