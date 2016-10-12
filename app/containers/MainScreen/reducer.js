import { fromJS } from 'immutable';
import {
  FETCH_STOCK_DATA,
  FETCH_STOCK_DATA_SUCCESS,
  FETCH_STOCK_DATA_ERROR,
  CHANGE_SEARCH_QUERY,
  PUT_SEARCH_RESULTS,
  VIEW_STOCK_DATA_SCREEN,
} from './constants';

const initalState = fromJS({
  searchQuery: '',
  searchResults: [],
  fetchErrors: false,
  isFetching: false,
  stockDataParams: false,
  individualStockData: false,
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
        .set('individualStockData', action.payload);
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
    default:
      return state;
  }
}
