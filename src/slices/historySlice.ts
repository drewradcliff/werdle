// Packages
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Types
import { History } from 'models';

export interface HistoryState {
  history: History[];
}

const initialState: HistoryState = {
  history: [],
};

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<History[]>) => {
      state.history = action.payload;
    },
    add: (state, action: PayloadAction<History>) => {
      state.history.push(action.payload);
    },
    clear: state => {
      state = initialState;
    },
  },
});

export const { set, add, clear } = historySlice.actions;

export default historySlice.reducer;
