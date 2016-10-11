import { fromJS } from 'immutable';
import {
  FETCH_STOCK_DATA,
  CHANGE_SEARCH_QUERY,
  PUT_SEARCH_RESULTS,
} from './constants';

const initalState = fromJS({
  searchQuery: '',
  isLoadingSearchResults: false,
  searchResults: []
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
        .set('searchResults', fromJS(action.payload.ResultSet.Result));
    default:
      return state;
  }
}
