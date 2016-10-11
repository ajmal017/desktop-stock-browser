import {
  FETCH_STOCK_DATA,
  CHANGE_SEARCH_QUERY,
  PUT_SEARCH_RESULTS,
  VIEW_STOCK_DATA,
} from './constants';

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

function fetchStockData(symbol) {
  return {
    type: FETCH_STOCK_DATA,
    payload: symbol,
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
};

