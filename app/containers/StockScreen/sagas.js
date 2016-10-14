import { fork, take } from 'redux-saga/effects';
import { START_STOCK_PULL } from './redux';

function* stockDataPullerHandler() {
  while (true) {
    const { payload } = yield take(START_STOCK_PULL);
    console.log(payload);
  }
}

function* individualStockWatcher() {
  yield fork(stockDataPullerHandler);
}

export default individualStockWatcher;
