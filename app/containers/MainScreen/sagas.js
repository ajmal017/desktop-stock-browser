import { take, fork, call, put } from 'redux-saga/effects';
import { delay, takeLatest } from 'redux-saga';
import { push } from 'react-router-redux';
import {
   FETCH_STOCK_DATA,
   CHANGE_SEARCH_QUERY,
   VIEW_STOCK_DATA,
} from './constants';
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
  putSearchResults,
  viewStockDataScreen,
  fetchStockDataSuccess,
  fetchStockDataError,
} from './actions';

function* fetchStockData({ stockSymbol, stockExch }) {
  try {
    const googleData = yield call(request, 'GET', {}, googleLookup(stockExch, stockSymbol));
    const yahooData = yield call(request, 'GET', {}, yahooLookup(stockSymbol));
    const parsedGoogleData = yield call(parseGoogleData, googleData.data);
    const parsedYahooData = yield call(parseYahooData, yahooData.data);

    yield put(fetchStockDataSuccess(parsedYahooData, parsedGoogleData));
  } catch (error) {
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
    yield call(fetchStockData, {
      stockSymbol: payload.symbol,
      stockExch: payload.exchDisp,
    });
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

function* rootMainWatcher() {
  yield fork(stockDataLoop);
  yield fork(searchQueryLoop);
  yield fork(viewStockDataLoop);
}

export default rootMainWatcher;

