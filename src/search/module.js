import { createModule } from 'redux-modules';

const searchModule = createModule({
  name: 'search',
  initialState: {},
  transformations: {
    clearSearch(state, action) {
      return {
        ...state,
        searchTerm: null,
        searchResults: null,
        searchMetadata: null
      };
    },
    doSearch(state, action) {
      // TODO: do the search
      return {
        ...state,
        isLoading: true,
        searchTerm: action.payload
      };
    },
    getSearchMetadata(state, action) {
      // TODO: get the data
      return {
        ...state,
        isLoading: true
      };
    },
    onSearchFailure(state, action) {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    },
    onSearchMetadataSuccess(state, action) {
      return {
        ...state,
        isLoading: false,
        searchMetadata: action.payload.data
      };
    },
    onSearchMetadataFailure(state, action) {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    },
    onSearchSuccess(state, action) {
      return {
        ...state,
        isLoading: false,
        searchResults: action.payload.data
      };
    }
  }
});

export default searchModule;
