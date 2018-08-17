import moment from 'moment';

import { createSelector, createStructuredSelector } from 'reselect';

function formatDuration(duration) {
  return moment.utc(moment.duration(duration).asMilliseconds()).format("HH:mm:ss");
}

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
