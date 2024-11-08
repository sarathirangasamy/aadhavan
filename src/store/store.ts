import { configureStore } from '@reduxjs/toolkit';
import laboratoryReducer from './laboratorySlice';

export const store = configureStore({
    reducer: {
        laboratory: laboratoryReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
