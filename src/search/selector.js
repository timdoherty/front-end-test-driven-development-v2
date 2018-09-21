import { createSelector, createStructuredSelector } from 'reselect';
import { formatDuration } from '../utils';

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
  (results, metadata) => results.items.map(result => {
    const meta = metadata.items.find(
      datum => datum.id === result.id.videoId
    );
    return {
      ...result,
      ...meta,
      contentDetails: {
        duration: meta ? formatDuration(meta.contentDetails.duration) : ''
      }
    };
  })
);

export default createStructuredSelector({
  searchResults: searchResultsSelector,
  searchTerm: searchTermSelector
});
