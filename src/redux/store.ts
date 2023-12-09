import { configureStore } from '@reduxjs/toolkit';
import debouncedReducer from './debouncedSlide';
import isLoginSlide from './isLoginSlice';
import videoSlice from './videoSlice';
import dataCollectReducer from './dataCollectSlide';
import VIPPaymentReducer from './VIPPaymentSlice'

export const store = configureStore({
    reducer: {
        debounced: debouncedReducer,
        user: isLoginSlide,
        videoWatching: videoSlice,
        dataCollect: dataCollectReducer,
        VIPPayment: VIPPaymentReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

