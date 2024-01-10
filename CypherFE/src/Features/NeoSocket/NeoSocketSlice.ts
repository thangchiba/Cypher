import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NeoClient } from '../../Utils/NeoSocket/NeoSocketLib/NeoClient';

// Define the initial state using your existing ConnectionState interface
export interface ConnectionState {
  client: NeoClient | null;
  isConnecting: boolean;
}

const initialState: ConnectionState = {
  client: null,
  isConnecting: false,
};

const connectionSlice = createSlice({
  name: 'neosocket', // Give your slice a name
  initialState,
  reducers: {
    // Automatically generates the action 'connection/openConnection'
    openConnection: (state) => {},
    // Automatically generates the action 'connection/closeConnection'
    closeConnection: (state) => {
      // state.client?.closeConnection();
    },
    // Automatically generates the action 'connection/setConnection'
    setConnection: (state, action: PayloadAction<NeoClient | null>) => {
      state.client = action.payload;
    },
    // Automatically generates the action 'connection/setIsConnecting'
    setIsConnecting: (state, action: PayloadAction<boolean>) => {
      state.isConnecting = action.payload;
    },
    onDisconnect: (state) => {
      state.client = null;
      state.isConnecting = false;
    },
  },
});

// Export the automatically generated action creators
export const { openConnection, closeConnection, onDisconnect, setConnection, setIsConnecting } = connectionSlice.actions;

// Export the reducer
export default connectionSlice.reducer;
