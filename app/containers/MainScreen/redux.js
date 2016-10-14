import { fromJS } from 'immutable';
import {
  parseStockRangeData,
} from '../../utils/formatter';

export const CHANGE_SEARCH_QUERY = 'CHANGE_SEARCH_QUERY';
export const PUT_SEARCH_RESULTS = 'PUT_SEARCH_RESULTS';
export const VIEW_STOCK_DATA = 'VIEW_STOCK_DATA';
export const VIEW_STOCK_DATA_SCREEN = 'VIEW_STOCK_DATA_SCREEN';

export const SELECT_NEW_RANGE = 'SELECT_NEW_RANGE';

export const FETCH_STOCK_DATA = 'FETCH_STOCK_DATA';
export const FETCH_STOCK_DATA_SUCCESS = 'FETCH_STOCK_DATA_SUCCESS';
export const FETCH_STOCK_DATA_ERROR = 'FETCH_STOCK_DATA_ERROR';
export const FETCH_UPDATED_DATA = 'FETCH_UPDATED_DATA';

export function fetchUpdatedDataSuccess(data) {
  return {
    type: FETCH_UPDATED_DATA,
    payload: data,
  };
}

export function selectNewRange(newRange) {
  return {
    type: SELECT_NEW_RANGE,
    payload: newRange,
  };
}

export function viewStockDataScreen(state) {
  return {
    type: VIEW_STOCK_DATA_SCREEN,
    payload: state,
  };
}

export function viewStockData(stockDataParams) {
  return {
    type: VIEW_STOCK_DATA,
    payload: stockDataParams,
  };
}

export function putSearchResults(searchResults) {
  return {
    type: PUT_SEARCH_RESULTS,
    payload: searchResults,
  };
}

export function fetchStockData(symbol, exch) {
  return {
    type: FETCH_STOCK_DATA,
    payload: {
      stockSymbol: symbol,
      stockExch: exch,
    },
  };
}

export function fetchStockDataSuccess(yahooData, googleData) {
  const { series, ...rest } = yahooData;
  const range = rest.meta.uri.match(/range=(.+)\/json/)[1];
  return {
    type: FETCH_STOCK_DATA_SUCCESS,
    payload: {
      individual: {
        google: googleData,
        yahoo: rest,
      },
      chart: series,
      range,
    },
  };
}

export function fetchStockDataError(error) {
  return {
    type: FETCH_STOCK_DATA_ERROR,
    payload: error,
  };
}

export function changeSearchQuery(newQuery) {
  return {
    type: CHANGE_SEARCH_QUERY,
    payload: newQuery,
  };
}

const initalState = fromJS({
  searchQuery: '',
  searchResults: [],
  fetchErrors: false,
  isFetching: false,
  stockDataParams: false,
  individualStockData: {},
  chartStockData: false,
  range: false,
});

export default function dataFetcherReducer(state = initalState, action) {
  switch (action.type) {
    case FETCH_STOCK_DATA:
      return state.set('isFetching', true);
    case FETCH_STOCK_DATA_ERROR:
      return state
        .set('isFetching', false)
        .set('fetchErrors', action.payload);
    case FETCH_STOCK_DATA_SUCCESS:
      return state
        .set('isFetching', false)
        .set('individualStockData', fromJS(action.payload.individual))
        .set('chartStockData', parseStockRangeData(action.payload.range, action.payload.chart))
        .set('range', action.payload.range);
    case CHANGE_SEARCH_QUERY:
      return state
        .set('isFetching', true)
        .set('searchQuery', action.payload);
    case PUT_SEARCH_RESULTS:
      return state
        .set('isFetching', false)
        .set('searchResults', fromJS(action.payload));
    case VIEW_STOCK_DATA_SCREEN:
      return state.set('stockDataParams', action.payload);
    case FETCH_UPDATED_DATA:
      return state.setIn(['individualStockData', 'google'], action.payload);
    default:
      return state;
  }
}
