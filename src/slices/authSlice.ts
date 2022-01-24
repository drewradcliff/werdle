// Packages
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types
import { AuthData } from 'types';

export interface AuthState {
  authData: AuthData;
}

const initialState: AuthState = {
  authData: { emailAddress: '', password: '' },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateAuthData: (state, action: PayloadAction<AuthData>) => {
      state.authData = action.payload;
    },
  },
});

export const { updateAuthData } = authSlice.actions;

export default authSlice.reducer;
