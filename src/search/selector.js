import { createSelector, createStructuredSelector } from 'reselect';
import { combineSearchData } from '../utils';

const baseSelector = state => state.search;

const searchTermSelector = createSelector(
  baseSelector,
  base => base.searchTerm
);

const rawSearchResultsSelector = createSelector(
  baseSelector,
  base => base.searchResults || { items: [] }
);

const searchMetadataSelector = createSelector(
  baseSelector,
  base => base.searchMetadata || { items: [] }
);

const searchResultsSelector = createSelector(
  rawSearchResultsSelector,
  searchMetadataSelector,
  (results, metadata) => combineSearchData(
    results.items, metadata.items
  )
);

export default createStructuredSelector({
  searchResults: searchResultsSelector,
  searchTerm: searchTermSelector
});
