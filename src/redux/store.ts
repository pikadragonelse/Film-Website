import { configureStore } from '@reduxjs/toolkit';
import debouncedReducer from './debouncedSlide';
import currentUserSlice from './currentUserSlide';

export const store = configureStore({
    reducer: {
        debounced: debouncedReducer,
        user: currentUserSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;