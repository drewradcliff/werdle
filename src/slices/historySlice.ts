import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface History {
  completedAt: number
  guesses: number
  word: string
}

export interface HistoryState {
  history: History[]
}

const initialState: HistoryState = {
  history: []
}

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<History[]>) => {
      state.history = action.payload
    },
    add: (state, action: PayloadAction<History>) => {
      state.history.push(action.payload)
    },
    clear: (state) => {
      state = initialState
    }
  }
})

export const { set, add, clear } = historySlice.actions

export default historySlice.reducer