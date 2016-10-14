import { createSelector } from 'reselect';

const selectStockDomain = () => (state) => state.get('stock');

const selectIsFetching = () => createSelector(
  selectStockDomain(),
  (substate) => substate.get('isPulling'),
);

export default {
  selectIsFetching,
};
