import {
  FETCH_STOCK_DATA,
  FETCH_STOCK_DATA_SUCCESS,
  FETCH_STOCK_DATA_ERROR,
  CHANGE_SEARCH_QUERY,
  PUT_SEARCH_RESULTS,
  VIEW_STOCK_DATA,
  VIEW_STOCK_DATA_SCREEN,
} from './constants';

function viewStockDataScreen(state) {
  return {
    type: VIEW_STOCK_DATA_SCREEN,
    payload: state,
  };
}

function viewStockData(stockDataParams) {
  return {
    type: VIEW_STOCK_DATA,
    payload: stockDataParams,
  };
}

function putSearchResults(searchResults) {
  return {
    type: PUT_SEARCH_RESULTS,
    payload: searchResults,
  };
}

function fetchStockData(symbol, exch) {
  return {
    type: FETCH_STOCK_DATA,
    payload: {
      stockSymbol: symbol,
      stockExch: exch,
    },
  };
}

function fetchStockDataSuccess(yahooData, googleData) {
  return {
    type: FETCH_STOCK_DATA_SUCCESS,
    payload: {
      google: googleData,
      yahoo: yahooData,
    },
  };
}

function fetchStockDataError(error) {
  return {
    type: FETCH_STOCK_DATA_ERROR,
    payload: error,
  };
}

function changeSearchQuery(newQuery) {
  return {
    type: CHANGE_SEARCH_QUERY,
    payload: newQuery,
  };
}

export default {
  fetchStockData,
  fetchStockDataSuccess,
  fetchStockDataError,
  changeSearchQuery,
  putSearchResults,
  viewStockData,
  viewStockDataScreen,
};

