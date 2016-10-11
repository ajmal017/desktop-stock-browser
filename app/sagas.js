import { fork } from 'redux-saga/effects';
import * as stockDataWatcher from './containers/MainScreen/sagas';

export default function* root() {
  yield fork(stockDataWatcher.default);
}
