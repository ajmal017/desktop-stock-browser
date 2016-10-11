import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { hashHistory } from 'react-router';
import { routerMiddleware, push } from 'react-router-redux';
import createLogger from 'redux-logger';
import rootReducer from '../reducer';

const router = routerMiddleware(hashHistory);
const sagaMiddleware = createSagaMiddleware();


let enhancer;
if (process.env.NODE_ENV === 'development') {
  const actionCreators = {
    push,
  };

  const logger = createLogger({
    level: 'info',
    collapsed: true
  });

  enhancer = compose(
    applyMiddleware(sagaMiddleware, router, logger),
    window.devToolsExtension ?
      window.devToolsExtension({ actionCreators }) :
      noop => noop
  );
} else {
  enhancer = applyMiddleware(sagaMiddleware, router);
}

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);
  store.runSaga = sagaMiddleware.run;

  if (window.devToolsExtension && process.env.NODE_ENV === 'development') {
    window.devToolsExtension.updateStore(store);
  }

  if (module.hot && process.env.NODE_ENV === 'development') {
    module.hot.accept('../reducer', () =>
      store.replaceReducer(require('../reducer')) // eslint-disable-line global-require
    );
  }

  return store;
}
