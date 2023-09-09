import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Query } from '@/containers/FilterPanel';

export interface FilterState {
  url: string | null;
  params: Query;
}

const initialState: FilterState = {
  url: null,
  params: {},
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilters: (
      state: FilterState,
      action: PayloadAction<FilterState>
    ): void => {
      state.url = action.payload.url;
      state.params = action.payload.params;
    },
    clearFilters: (state: FilterState): void => {
      state.url = null;
      state.params = {};
    },
  },
});

export const { clearFilters, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
