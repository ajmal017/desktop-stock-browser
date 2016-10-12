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
  (substate) => substate.get('individualStockData'),
);

export default {
  selectSearchQuery,
  selectSearchResults,
  selectShouldRenderBack,
  selectStockParams,
  selectIndividualStockData,
};
