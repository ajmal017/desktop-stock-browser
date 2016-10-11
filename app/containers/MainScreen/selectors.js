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

export default {
  selectSearchQuery,
  selectSearchResults,
};
