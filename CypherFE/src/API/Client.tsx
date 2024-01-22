import { NeoClient } from '../Utils/NeoSocket/NeoSocketLib/NeoClient';
import { toast } from 'react-toastify';

const url = 'neosks://api.thangchiba.com/websocket';

const Client = new NeoClient(url);
Client.onDisconnect.push(() => {
  toast.warning('Disconnected NeoSocket Server!');
});

Client.onConnect.push(() => {
  toast.success('Connected NeoSocket Server!');
  console.log('New client id : ', Client?.clientId);
});

export default Client;
