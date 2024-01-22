import { createAsyncThunk } from '@reduxjs/toolkit';
import { NeoClient } from '../../Utils/NeoSocket/NeoSocketLib/NeoClient';
import { onDisconnect, setConnection } from './NeoSocketSlice';
import { toast } from 'react-toastify';
import { RootState } from '../../Redux/store';

// Using RootState to type the state in the selector
const getCurrentClient = (state: RootState) => state.neosocket.client;

// createAsyncThunk for opening a connection
export const openConnection = createAsyncThunk('neosocket/openConnection', async (_, thunkAPI) => {
  const currentClient = getCurrentClient(thunkAPI.getState() as RootState);
  if (currentClient) {
    currentClient.closeConnection();
    thunkAPI.dispatch(setConnection(null));
  }

  // const newClient = new NeoClient('neosks://192.168.1.74/websocket');
  // const newClient = new NeoClient('neosk://localhost:51994');
  const newClient = new NeoClient('neosks://api.thangchiba.com/websocket');
  newClient.onDisconnect.push(() => {
    toast.warning('Disconnected NeoSocket Server!');
    thunkAPI.dispatch(onDisconnect());
  });

  try {
    await newClient.connect(3000);
    thunkAPI.dispatch(setConnection(newClient));
    toast.success('Connected to NeoSocket Server Successfully!');
    return true;
  } catch (error) {
    toast.error('Failed to connect to NeoSocket Server');
    throw error;
  }
});

// createAsyncThunk for closing a connection
export const closeConnection = createAsyncThunk('neosocket/closeConnection', async (_, thunkAPI) => {
  const currentClient = getCurrentClient(thunkAPI.getState() as RootState);
  if (currentClient) {
    currentClient.closeConnection();
    thunkAPI.dispatch(setConnection(null));
  } else {
    throw new Error('No active connection to close');
  }
});
