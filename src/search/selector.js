import { combineSearchData } from '../utils';

const baseSelector = state => state.search;

const searchTermSelector = state => state.search.searchTerm;

const rawSearchResultsSelector = state => state.search.searchResults || { items: [] };

const searchMetadataSelector = state => state.search.searchMetadata || { items: [] };

const searchResultsSelector = state => {
  const results = rawSearchResultsSelector(state);
  const metadata = searchMetadataSelector(state);
  return combineSearchData(results.items, metadata.items);
};

export default function(state) {
  return {
    searchResults: searchResultsSelector(state),
    searchTerm: searchTermSelector(state)
  };
}
