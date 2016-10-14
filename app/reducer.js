// @flow
import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import dataFetcherReducer from './containers/MainScreen/redux';
import individualDataReducer from './containers/StockScreen/redux';

const routeInitialState = fromJS({
  locationBeforeTransitions: null,
});

/**
 * Merge route into the global application state
 */
function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    /* istanbul ignore next */
    case LOCATION_CHANGE:
      return state.merge({
        locationBeforeTransitions: action.payload,
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  route: routeReducer,
  data: dataFetcherReducer,
  stock: individualDataReducer,
});

export default rootReducer;
