import { configureStore } from '@reduxjs/toolkit';

import filtersReducer from '@/store/slices/filters';
import userReducer from '@/store/slices/user';

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    user: userReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
