import { take, fork, call, put, select } from 'redux-saga/effects';
import { delay, takeLatest } from 'redux-saga';
import { push } from 'react-router-redux';
import { request } from '../../utils/request';
import {
  googleLookup,
  yahooLookup,
  symbolLookup,
} from '../../utils/api';
import {
  parseGoogleData,
  parseYahooData,
  parseSymbolLookupData,
} from '../../utils/parser';
import {
  FETCH_STOCK_DATA,
  CHANGE_SEARCH_QUERY,
  VIEW_STOCK_DATA,
  SELECT_NEW_RANGE,
  putSearchResults,
  viewStockDataScreen,
  fetchStockDataSuccess,
  fetchStockDataError,
} from './redux';
import { selectStockParams } from './selectors';

function* fetchStockData(params) {
  const fetchData = yield select(selectStockParams());
  const { symbol, exchDisp } = fetchData;
  let range = '1d';

  if (params) {
    range = params.payload;
  }

  try {
    const googleData = yield call(request, 'GET', {}, googleLookup(exchDisp, symbol));
    const yahooData = yield call(request, 'GET', {}, yahooLookup(symbol, range));
    const parsedGoogleData = yield call(parseGoogleData, googleData.data);
    const parsedYahooData = yield call(parseYahooData, yahooData.data);

    yield put(fetchStockDataSuccess(parsedYahooData, parsedGoogleData));
  } catch (error) {
    console.log(error);
    yield put(fetchStockDataError(error));
  }
}

function* fetchStockSuggesions({ payload }) {
  yield delay(500);
  const symbolLookupData = yield call(request, 'GET', {}, symbolLookup(payload));
  const parsedSymbolData = yield call(parseSymbolLookupData, symbolLookupData.data);
  yield put(putSearchResults(parsedSymbolData));
}

function* viewStockData({ payload }) {
  /*
  Takes seleced stock from search/ favourites/ portfolio and views it using react router and state
  */
  yield put(viewStockDataScreen(payload));
  if (payload) {
    yield put(push('/stock'));
    yield call(fetchStockData);
  }
}


function* stockDataLoop() {
  while (true) {
    const { payload } = yield take(FETCH_STOCK_DATA);
    yield call(fetchStockData, payload);
  }
}

function* searchQueryLoop() {
  yield takeLatest(CHANGE_SEARCH_QUERY, fetchStockSuggesions);
}

function* viewStockDataLoop() {
  yield takeLatest(VIEW_STOCK_DATA, viewStockData);
}

function* changeFetchRange() {
  yield takeLatest(SELECT_NEW_RANGE, fetchStockData);
}

function* rootMainWatcher() {
  yield fork(stockDataLoop);
  yield fork(searchQueryLoop);
  yield fork(viewStockDataLoop);
  yield fork(changeFetchRange);
}

export default rootMainWatcher;

