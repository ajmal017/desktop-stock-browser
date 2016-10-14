import { fromJS } from 'immutable';

export const START_STOCK_PULL = 'app/StockScreen/START_STOCK_PULL';
const END_STOCK_PULL = 'app/StockScreen/END_STOCK_PULL';

export function startStockPull(symbol, exchange) {
  return {
    type: START_STOCK_PULL,
    payload: {
      symbol,
      exchange,
    }
  };
}

export function endStockPull() {
  return {
    type: END_STOCK_PULL,
  };
}


const initalState = fromJS({
  isPulling: false,
});

export default function reducer(state = initalState, action) {
  switch (action.type) {
    case START_STOCK_PULL:
      return state
        .set('isPulling', true);
    case END_STOCK_PULL:
      return state
        .set('isPulling', false);
    default:
      return state;
  }
}
