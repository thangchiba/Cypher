import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NeoClient } from '../../Utils/NeoSocket/NeoSocketLib/NeoClient';
import { closeConnection, openConnection } from './NeoSocketReducer';

// Define the initial state using your existing ConnectionState interface
interface NeoSocketState {
  client: NeoClient | null;
  isConnected: boolean;
  isLoading: boolean;
}

const initialState: NeoSocketState = {
  client: null,
  isConnected: false,
  isLoading: false,
};
const connectionSlice = createSlice({
  name: 'neosocket', // Give your slice a name
  initialState,
  reducers: {
    // Automatically generates the action 'connection/setConnection'
    setConnection: (state, action: PayloadAction<NeoClient | null>) => {
      state.client = action.payload;
    },
    // Automatically generates the action 'connection/setIsConnected'
    setIsConnected: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
    onDisconnect: (state) => {
      state.client = null;
      state.isConnected = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(openConnection.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(openConnection.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isConnected = true;
      })
      .addCase(openConnection.rejected, (state) => {
        state.isLoading = false;
        state.isConnected = false;
      })
      .addCase(closeConnection.fulfilled, (state) => {
        state.client = null;
        state.isConnected = false;
      });
    // Handle other cases as needed
  },
});

// Export the automatically generated action creators
export const { onDisconnect, setConnection, setIsConnected } = connectionSlice.actions;

// Export the reducer
export default connectionSlice.reducer;
