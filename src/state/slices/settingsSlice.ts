import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Settings } from 'models';

const initialState: Settings = {
  currentTheme: 'dark',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.currentTheme = action.payload;
    },
  },
});

export const { setTheme } = settingsSlice.actions;

export const settingsReducer = settingsSlice.reducer;

export const selectSettings = (state: { settings: Settings }) => state.settings;
