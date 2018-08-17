import { createSelector, createStructuredSelector } from 'reselect';

const baseSelector = state => state.search;

const searchTermSelector = createSelector(
  baseSelector,
  base => base.searchTerm
);

const rawSearchResultsSelector = createSelector(
  baseSelector,
  base => base.searchResults
);

const searchMetadataSelector = createSelector(
  baseSelector,
  base => base.searchMetadata
);

const searchResultsSelector = createSelector(
  rawSearchResultsSelector,
  searchMetadataSelector,
  (results, metadata) => results.items.map(result => {
    const meta = metadata.items.find(
      datum => datum.id === result.id.videoId
    );
    return {
      ...result,
      ...meta
    };
  })
);

export default createStructuredSelector({
  searchResults: searchResultsSelector,
  searchTerm: searchTermSelector
});
