// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { NeoClient } from '../../Utils/NeoSocket/NeoSocketLib/NeoClient';
// import { onDisconnect, setConnection, setIsConnecting } from './NeoSocketSlice';
// import { toast } from 'react-toastify';
//
// export const openConnection = createAsyncThunk('neosocket/openConnection', async (url: string, { dispatch, getState }) => {
//   const currentClient = getState().neosocket.client;
//   if (currentClient) {
//     currentClient.closeConnection();
//     dispatch(setConnection(null));
//   }
//
//   const newClient = new NeoClient(url || 'neosks://api.thangchiba.com/websocket:443');
//
//   newClient.onDisconnect.push(() => {
//     toast.warning('Disconnected NeoSocket Server!');
//     dispatch(onDisconnect());
//   });
//
//   try {
//     await newClient.connect(3000);
//     dispatch(setConnection(newClient));
//     dispatch(setIsConnecting(true));
//     toast.success('Connected to NeoSocket Server Successfully!');
//   } catch (error) {
//     console.log('Failed to connect:', error);
//     toast.error('Failure when connecting to NeoSocket Server!');
//     dispatch(onDisconnect());
//     throw error;
//   }
// });
