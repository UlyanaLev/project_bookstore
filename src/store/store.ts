import { configureStore } from '@reduxjs/toolkit';
import bookstoreReducer from '../slice/bookstore';

export const store = configureStore({
    reducer: {
        bookstore: bookstoreReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;