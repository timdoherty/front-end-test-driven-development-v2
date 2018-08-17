import { createModule } from 'redux-modules';
import { loop, Cmd } from 'redux-loop';
import axios from 'axios';

import searchSelector from './selector';

const searchModule = createModule({
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
    doSearch(state, action) {
      const { payload: url } = action;
      return loop(
        {
          ...state,
          isLoading: true
        },
        Cmd.run(
          axios.get,
          {
            args: [url],
            successActionCreator: searchModule.actions.setSearchResults,
            failActionCreator: searchModule.actions.onSearchFailure
          }
        )
      );
    },
    getSearchMetadata(state, action) {
      const { payload: url } = action;
      return loop(
        {
          ...state,
          isLoading: true
        },
        Cmd.run(
          axios.get,
          {
            args: [url],
            successActionCreator: searchModule.actions.setSearchMetadata,
            failActionCreator: searchModule.actions.onSearchMetadataFailure
          }
        )
      );
    },
    onSearchFailure(state, action) {
      const { payload: error } = action;
      return {
        ...state,
        isLoading: false,
        error
      };
    },
    onSearchMetadataFailure(state, action) {
      const { payload: error } = action;
      return {
        ...state,
        isLoading: false,
        error
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
        isLoading: false,
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

export default searchModule;
