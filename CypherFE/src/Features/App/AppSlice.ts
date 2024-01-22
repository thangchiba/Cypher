// appSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  loading: boolean;
  openSetting: boolean;
}

const initialState: AppState = {
  loading: false,
  openSetting: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setOpenSetting: (state, action: PayloadAction<boolean>) => {
      state.openSetting = action.payload;
    },
  },
});

export const { setLoading, setOpenSetting } = appSlice.actions;

export default appSlice.reducer;
