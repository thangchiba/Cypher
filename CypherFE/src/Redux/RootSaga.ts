import { all } from 'redux-saga/effects';
import watchNSConnection from '../Features/NeoSocket/NeoSocketSaga';

export default function* rootSaga() {
  yield all([watchNSConnection()]);
}
