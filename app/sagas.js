import { fork } from 'redux-saga/effects';
import * as stockDataWatcher from './containers/MainScreen/sagas';
import * as individualStockDataWatcher from './containers/StockScreen/sagas';

export default function* root() {
  yield fork(stockDataWatcher.default);
  yield fork(individualStockDataWatcher.default);
}
