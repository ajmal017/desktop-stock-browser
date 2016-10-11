// @flow
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Main from './containers/MainScreen';
import StockScreen from './containers/StockScreen';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Main} />
    <Route path="/stock" component={StockScreen} />
  </Route>
);
