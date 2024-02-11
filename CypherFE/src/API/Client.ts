import { NeoClient } from '../Utils/NeoSocket/NeoSocketLib/NeoClient';
import { toast } from 'react-toastify';
import { connected, disconnected } from '../Features/NeoSocket/NeoSocketSlice';
import { store } from '../Redux/store';

// Read environment variables
const secure = process.env.REACT_APP_NEOSOCKET_SECURE === 'true';
const address = process.env.REACT_APP_NEOSOCKET_ADDRESS || 'localhost';
const port = process.env.REACT_APP_NEOSOCKET_PORT || (secure ? 443 : 80);
const protocol = secure ? 'neosks' : 'neosk';

const url = `${protocol}://${address}:${port}`;

const Client = new NeoClient(url);
Client.onDisconnect.push(() => {
  toast.error('Disconnected NeoSocket Server!');
  store.dispatch(disconnected());
});

Client.onConnect.push(() => {
  toast.success('Connected NeoSocket Server!');
  // console.log('New client id : ', Client?.clientId);
  store.dispatch(connected(Client?.clientId));
});

export default Client;
