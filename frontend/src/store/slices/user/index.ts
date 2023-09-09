import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import http from '@/services/http';
import { API_ROUTES } from '@/utils/constants';
import { UserZ } from '@/models/user';

export interface UserState {
  user: UserZ | null;
  authenticated: null | boolean;
  loading: boolean;
}

const initialState: UserState = {
  user: null,
  authenticated: false,
  loading: true,
};

export const checkUser = createAsyncThunk('user/checkUser', async (_) => {
  try {
    const res = await http.get<{ data: UserZ }>(API_ROUTES.AUTH.CURRENT_USER);
    return res?.data?.data;
  } catch (err) {
    return null;
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state: UserState, action: PayloadAction<UserZ | null>): void => {
      state.user = action.payload;
      state.authenticated = action.payload ? true : false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        checkUser.fulfilled,
        (state, action: PayloadAction<UserZ | null>) => {
          state.loading = false;
          state.user = action.payload;
          state.authenticated = action.payload ? true : false;
        }
      )
      .addCase(checkUser.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
