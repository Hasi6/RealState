import { configureStore } from '@reduxjs/toolkit';
import userReducer, { setUser, checkUser } from '.';

jest.mock('../../../services/http', () => ({
  get: jest.fn()
}));

import http from '@/services/http';

describe('userSlice', () => {
  let store = configureStore({ reducer: { user: userReducer } });

  beforeEach(() => {
    store = configureStore({ reducer: { user: userReducer } });
    jest.clearAllMocks();
  });

  it('should handle initial state', () => {
    expect(store.getState().user).toEqual({
      user: null,
      authenticated: false,
      loading: true
    });
  });

  it('should handle setUser', () => {
    const mockUser = {
      id: '1',
      email: 'John Doe'
    };

    store.dispatch(setUser(mockUser));

    expect(store.getState().user).toEqual({
      user: mockUser,
      authenticated: true,
      loading: true
    });
  });

  describe('checkUser async thunk', () => {
    const mockUser = {
      id: '1',
      name: 'test@gmail.com'
    };

    it('should handle checkUser success', async () => {
      (http.get as jest.Mock).mockResolvedValueOnce({
        data: { data: mockUser }
      });

      await store.dispatch(checkUser());

      expect(store.getState().user).toEqual({
        user: mockUser,
        authenticated: true,
        loading: false
      });
    });

    it('should handle checkUser failure', async () => {
      (http.get as jest.Mock).mockRejectedValueOnce(
        new Error('Failed to fetch')
      );

      await store.dispatch(checkUser());

      expect(store.getState().user).toEqual({
        user: null,
        authenticated: false,
        loading: false
      });
    });
  });
});
