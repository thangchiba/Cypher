import { call, put, select, takeLatest } from 'redux-saga/effects';
import { NeoClient } from '../../Utils/NeoSocket/NeoSocketLib/NeoClient';
import { ConnectionState, onDisconnect, setConnection, setIsConnecting } from './NeoSocketSlice';
import { store } from '../../Redux/store';
import { toast } from 'react-toastify';

// Selector to get the current client from the state
const getCurrentClient = (state: { neosocket: ConnectionState }) => state.neosocket.client;

function* openConnectionSaga() {
  try {
    const currentClient: NeoClient | null = yield select(getCurrentClient);
    if (currentClient) {
      currentClient.closeConnection();
      yield put(setConnection(null));
    }

    // const newClient: NeoClient = new NeoClient('neosk://localhost:51994');
    const newClient: NeoClient = new NeoClient('neosks://192.168.1.74/websocket');
    // const newClient: NeoClient = new NeoClient('neosks://api.thangchiba.com/websocket:443');

    // Handle disconnect event
    newClient.onDisconnect.push(() => {
      console.log('Disconnected NeoSocket Server!');
      toast.warning('Disconnected NeoSocket Server!');
      store.dispatch(onDisconnect()); // Directly dispatch using the store
    });

    // Connect and handle potential connection failure
    try {
      // await newClient.connect(3000);
      yield call([newClient, newClient.connect], 3000);
      yield put(setConnection(newClient));
      yield put(setIsConnecting(true));
      toast.success('Connect to NeoSocket Server Successfully!');
    } catch (error) {
      console.log('Failed to connect:', error);
      toast.error('Failure when connect to NeoSocket Server!');
      yield put(onDisconnect()); // Handle connection failure
    }
  } catch (error) {
    toast.error('Failure when connect to NeoSocket Server!');
    console.error('Connection error:', error);
    yield put(setIsConnecting(false));
  }
}

function* closeConnectionSaga() {
  try {
    const currentClient: NeoClient | null = yield select(getCurrentClient);
    if (currentClient) {
      currentClient.closeConnection();
    }
    yield put(setConnection(null));
    yield put(setIsConnecting(false));
  } catch (error) {
    console.error('Error closing connection:', error);
    // Handle error
  }
}

export default function* watchNSConnection() {
  yield takeLatest('neosocket/openConnection', openConnectionSaga);
  yield takeLatest('neosocket/closeConnection', closeConnectionSaga);
}
