import { createSlice } from '@reduxjs/toolkit';

interface NeoSocketState {
  clientId: number | null;
  isConnected: boolean;
  error: any;
}

const initialState: NeoSocketState = {
  clientId: null,
  isConnected: false,
  error: null,
};

const connectionSlice = createSlice({
  name: 'connection',
  initialState,
  reducers: {
    connected: (state, action) => {
      console.log('Connected to NeoSocket Server Successfully!');
      state.isConnected = true;
      state.clientId = action.payload;
      state.error = null;
    },
    disconnected: (state) => {
      state.isConnected = false;
      state.clientId = null;
    },
    connectionError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { connected, disconnected, connectionError } = connectionSlice.actions;
export default connectionSlice.reducer;
