import { formatDuration } from '../utils';

const baseSelector = state => state.search;

const searchTermSelector = state => state.search.searchTerm;

const rawSearchResultsSelector = state => state.search.searchResults || { items: [] };

const searchMetadataSelector = state => state.search.searchMetadata || { items: [] };

const searchResultsSelector = state => {
  const results = rawSearchResultsSelector(state);
  const metadata = searchMetadataSelector(state);
  return results.items.map(result => {
    const meta = metadata.items.find(
      datum => datum.id === result.id.videoId
    );
    return {
      ...result,
      ...meta,
      contentDetails: {
        duration: meta ? formatDuration(meta.contentDetails.duration) : ''
      },
      statistics: meta ? meta.statistics : {}
    };
  });
};

export default function(state) {
  return {
    searchResults: searchResultsSelector(state),
    searchTerm: searchTermSelector(state)
  };
}
