import { fromJS } from 'immutable';
import {
  FETCH_STOCK_DATA,
  CHANGE_SEARCH_QUERY,
  PUT_SEARCH_RESULTS,
  VIEW_STOCK_DATA_SCREEN,
} from './constants';

const initalState = fromJS({
  searchQuery: '',
  searchResults: [],
  isLoadingSearchResults: false,
  stockDataParams: false,
});

export default function dataFetcherReducer(state = initalState, action) {
  switch (action.type) {
    case FETCH_STOCK_DATA:
      return state;
    case CHANGE_SEARCH_QUERY:
      return state
        .set('isLoadingSearchResults', true)
        .set('searchQuery', action.payload);
    case PUT_SEARCH_RESULTS:
      return state
        .set('isLoadingSearchResults', false)
        .set('searchResults', fromJS(action.payload));
    case VIEW_STOCK_DATA_SCREEN:
      return state.set('stockDataParams', action.payload);
    default:
      return state;
  }
}
