import { configureStore } from '@reduxjs/toolkit';
import debouncedReducer from './debouncedSlide';

export const store = configureStore({
    reducer: {
        debounced: debouncedReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;