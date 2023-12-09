import { configureStore } from '@reduxjs/toolkit';
import debouncedReducer from './debouncedSlide';
import isLoginSlide from './isLoginSlice';
import dataCollectReducer from './dataCollectSlide';
import dataLoveSlide from './dataLoveSlide';

export const store = configureStore({
    reducer: {
        debounced: debouncedReducer,
        user: isLoginSlide,
        dataCollect: dataCollectReducer,
        dataLove: dataLoveSlide,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

