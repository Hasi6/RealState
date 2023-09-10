import { configureStore } from '@reduxjs/toolkit';
import filterReducer, { clearFilters, setFilters } from '.';

describe('filterSlice', () => {
  let store = configureStore({ reducer: { filter: filterReducer } });

  beforeEach(() => {
    store = configureStore({ reducer: { filter: filterReducer } });
  });

  it('should handle initial state', () => {
    expect(store.getState().filter).toEqual({
      url: null,
      params: {}
    });
  });

  it('should handle setFilters', () => {
    const payload = {
      url: '/',
      params: { param1: 'value1', param2: 'value2' }
    };

    store.dispatch(setFilters(payload));

    expect(store.getState().filter).toEqual(payload);
  });

  it('should handle clearFilters', () => {
    const payload = {
      url: '/',
      params: { param1: 'value1', param2: 'value2' }
    };

    store.dispatch(setFilters(payload));

    store.dispatch(clearFilters());

    expect(store.getState().filter).toEqual({
      url: null,
      params: {}
    });
  });
});
