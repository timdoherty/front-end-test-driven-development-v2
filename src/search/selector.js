import { createSelector, createStructuredSelector } from 'reselect';

const baseSelector = state => state.search;

const searchTermSelector = createSelector(
  baseSelector,
  base => base.searchTerm
);

export default createStructuredSelector({
  searchTerm: searchTermSelector
});
