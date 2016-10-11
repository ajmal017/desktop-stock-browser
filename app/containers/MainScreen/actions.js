import {
  FETCH_STOCK_DATA,
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

function changeSearchQuery(newQuery) {
  return {
    type: CHANGE_SEARCH_QUERY,
    payload: newQuery,
  };
}

export default {
  fetchStockData,
  changeSearchQuery,
  putSearchResults,
  viewStockData,
  viewStockDataScreen,
};

