// appSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  loading: boolean;
}

const initialState: AppState = {
  loading: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = appSlice.actions;

export default appSlice.reducer;
