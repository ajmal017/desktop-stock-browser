import { fork, take, cancel, call, cancelled, put } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { LOCATION_CHANGE } from 'react-router-redux';
import { START_STOCK_PULL, endStockPull } from './redux';
import { googleLookup } from '../../utils/api';
import { parseGoogleData } from '../../utils/parser';
import { request } from '../../utils/request';
import { fetchUpdatedDataSuccess } from '../MainScreen/redux';

function* bgSync(data) {
  const { symbol, exchange } = data;
  try {
    while (true) {
      const pullData = yield call(request, 'GET', {}, googleLookup(exchange, symbol));
      const parsedPullData = yield call(parseGoogleData, pullData.data);
      yield put(fetchUpdatedDataSuccess(parsedPullData));
      yield call(delay, 4000);
    }
  } finally {
    if (yield cancelled()) {
      yield put(endStockPull());
      console.info(`Stopped pulling data for ${symbol}:${exchange}`);
    }
  }
}

function* stockDataPullerHandler() {
  while (true) {
    const { payload } = yield take(START_STOCK_PULL);
    const bgSyncTask = yield fork(bgSync, payload);

    yield take([LOCATION_CHANGE]);
    yield cancel(bgSyncTask);
  }
}

function* individualStockWatcher() {
  yield fork(stockDataPullerHandler);
}

export default individualStockWatcher;
