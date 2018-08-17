import { createModule } from 'redux-modules';

import searchSelector from './selector';

export default createModule({
  name: 'search',
  initialState: {},
  selector: searchSelector,
  transformations: {
    clearSearchResults(state, action) {
      return {
        ...state,
        searchResults: null
      };
    },
    clearSearchMetadata(state, action) {
      return {
        ...state,
        searchMetadata: null
      };
    },
    setSearchMetadata(state, action) {
      const { payload: { data: searchMetadata } } = action;
      return {
        ...state,
        searchMetadata
      };
    },
    setSearchResults(state, action) {
      const { payload: { data: searchResults } } = action;
      return {
        ...state,
        searchResults
      };
    },
    setSearchTerm(state, action) {
      const { payload } = action;
      return {
        ...state,
        searchTerm: payload
      };
    },
    clearSearchTerm(state, payload) {
      return {
        ...state,
        searchTerm: null
      };
    }
  }
});
