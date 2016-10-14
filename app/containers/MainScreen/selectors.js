import { createSelector } from 'reselect';

const selectDataDomain = () => (state) => state.get('data');


const selectSearchQuery = () => createSelector(
  selectDataDomain(),
  (substate) => substate.get('searchQuery'),
);

const selectSearchResults = () => createSelector(
  selectDataDomain(),
  (substate) => substate.get('searchResults'),
);

const selectStockParams = () => createSelector(
  selectDataDomain(),
  (substate) => substate.get('stockDataParams'),
);

const selectShouldRenderBack = () => createSelector(
  selectDataDomain(),
  (substate) => !!substate.get('stockDataParams')
);

const selectIndividualStockData = () => createSelector(
  selectDataDomain(),
  (substate) => substate.get('individualStockData').toJS()
);

const selectChartStockData = () => createSelector(
  selectDataDomain(),
  (substate) => substate.get('chartStockData'),
);

const selectStockRange = () => createSelector(
  selectDataDomain(),
  (substate) => substate.get('range')
);

export default {
  selectSearchQuery,
  selectSearchResults,
  selectShouldRenderBack,
  selectStockParams,
  selectChartStockData,
  selectIndividualStockData,
  selectStockRange,
};
