import { configureStore } from '@reduxjs/toolkit';
import debouncedReducer from './debouncedSlide';
import isLoginSlide from './isLoginSlice';

export const store = configureStore({
    reducer: {
        debounced: debouncedReducer,
        user: isLoginSlide,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

