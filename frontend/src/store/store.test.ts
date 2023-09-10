import { configureStore } from '@reduxjs/toolkit';

import filtersReducer from '@/store/slices/filters';
import userReducer from '@/store/slices/user';
import { store } from '@/store/store';

describe('Redux Store', () => {
  it('should configure the store with filters and user reducers', () => {
    const testStore = configureStore({
      reducer: {
        filters: filtersReducer,
        user: userReducer
      }
    });

    expect(store.getState()).toEqual(testStore.getState());
  });
});
