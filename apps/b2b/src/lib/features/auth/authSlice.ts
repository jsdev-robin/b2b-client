import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userAuthApi } from './authApi';
import { AuthState } from './types';

const initialState: AuthState = {
  token: null,
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signup: (
      state,
      action: PayloadAction<{
        token: string;
      }>,
    ) => {
      state.token = action.payload.token;
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher(
      userAuthApi.endpoints.findProfile.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.payload.user;
      },
    );
    builder.addMatcher(
      userAuthApi.endpoints.signout.matchFulfilled,
      (state) => {
        state.user = null;
        state.token = null;
      },
    );
  },
});

export const { signup } = authSlice.actions;

export default authSlice.reducer;
