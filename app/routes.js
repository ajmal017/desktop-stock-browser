import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Main from './containers/MainScreen';
import StockScreen from './containers/StockScreen';

const requireStockData = (store) => (nextState, replace) => {
  if (!store.getState().getIn(['data', 'stockDataParams'])) {
    replace({
      pathname: '/'
    });
  }
};

function routes(store) {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Main} />
      <Route
        path="/stock"
        component={StockScreen}
        onEnter={requireStockData(store)}
      />
    </Route>
);
}

export default routes;
