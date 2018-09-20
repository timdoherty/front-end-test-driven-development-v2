import { createModule } from 'redux-modules';
import { loop, Cmd } from 'redux-loop';
import axios from 'axios';

import searchSelector from './selector';
import { KEY } from '../constants';

const searchModule = createModule({
  name: 'search',
  initialState: {},
  selector: searchSelector,
  transformations: {
    clearSearchMetadata(state, action) {
      return {
        ...state,
        searchMetadata: null
      };
    },
    clearSearchResults(state, action) {
      return {
        ...state,
        searchResults: null
      };
    },
    clearSearchTerm(state, action) {
      return {
        ...state,
        searchTerm: null
      };
    },
    doSearch(state, action) {
      const { payload: searchTerm } = action;
      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${searchTerm}&maxResults=20&key=${KEY}`;
      return loop(
        {
          ...state,
          searchTerm,
          isLoading: true
        },
        Cmd.run(
          axios.get,
          {
            args: [url],
            successActionCreator: searchModule.actions.onSearchSuccess,
            failActionCreator: searchModule.actions.onSearchFailure
          }
        )
      );
    },
    getSearchMetadata(state, action) {
      const videoIds = searchSelector({ search: state }).searchResultIds;
      const url = `https://www.googleapis.com/youtube/v3/videos?part=statistics,contentDetails&id=${videoIds.join(',')}&key=${KEY}`;
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
    onSearchSuccess(state, action) {
      const { payload: { data: searchResults } } = action;
      return loop(
        {
          ...state,
          isLoading: false,
          searchResults
        },
        Cmd.action(searchModule.actions.getSearchMetadata())
      );
    },
    setSearchMetadata(state, action) {
      const { payload: { data: searchMetadata } } = action;
      return {
        ...state,
        searchMetadata
      };
    }
  }
});

export default searchModule;
