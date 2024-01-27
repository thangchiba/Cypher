import { NeoClient } from '../Utils/NeoSocket/NeoSocketLib/NeoClient';
import { toast } from 'react-toastify';

const url = 'neosks://api.thangchiba.com/websocket';
// const url = 'neosk://192.168.1.74:51994';
// const url = 'neosks://192.168.1.74/websocket';

const Client = new NeoClient(url);
Client.onDisconnect.push(() => {
  toast.warning('Disconnected NeoSocket Server!');
});

Client.onConnect.push(() => {
  toast.success('Connected NeoSocket Server!');
  console.log('New client id : ', Client?.clientId);
});

export default Client;
