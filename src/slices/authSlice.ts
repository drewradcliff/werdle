// Packages
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types
import { AuthData } from 'types';

export interface AuthState {
  authData: AuthData;
}

const initialState: AuthState = {
  authData: { emailAddress: '', password: '' },
  // account:
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // set: (state, action: PayloadAction<History[]>) => {
    //   state.history = action.payload;
    // },
    // add: (state, action: PayloadAction<History>) => {
    //   state.history.push(action.payload);
    // },
    // clear: state => {
    //   state = initialState;
    // },
    updateAuthData: (state, action: PayloadAction<AuthData>) => {
      state.authData = action.payload;
    },
  },
});

export const { updateAuthData } = authSlice.actions;

export default authSlice.reducer;
