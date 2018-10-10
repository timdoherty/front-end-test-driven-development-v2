import {
  loop,
  Cmd,
  getModel,
  getCmd,
} from 'redux-loop';
import axios from 'axios';

import searchModule from './module';
import searchResultsStubs from './stubs/searchResultsStub';
import searchMetadataStubs from './stubs/searchMetadataStub';
import { KEY } from '../constants';

const { actions, reducer } = searchModule;

describe('searchModule', () => {
  describe('search results', () => {
    describe('search results', () => {
      it('handles successful search', () => {
        const expected = loop(
          { isLoading: false, searchResults: searchResultsStubs },
          Cmd.action(actions.getSearchMetadata())
        );

        const actual = reducer({}, actions.onSearchSuccess({ data: searchResultsStubs }));

        expect(getModel(actual)).toEqual(getModel(expected));
        expect(getCmd(actual)).toEqual(getCmd(expected));
      }); 

      it('handles search failure', () => {
        const error = { message: 'foo' };
        const expected = { isLoading: false, error };
        const actual = reducer({ isLoading: true }, actions.onSearchFailure(error));

        expect(actual).toEqual(expected);
      });

      it('gets search results', () => {
        const state = { isLoading: false };
        const searchTerm = 'heisenberg';
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${searchTerm}&maxResults=20&key=${KEY}`;
        const expected = loop(
          {
            isLoading: true,
            searchTerm
          },
          Cmd.run(
            axios.get,
            {
              args: [url],
              successActionCreator: actions.onSearchSuccess,
              failActionCreator: actions.onSearchFailure,
            }
          )
        );

        const actual = reducer(state, actions.doSearch(searchTerm));
        expect(getModel(actual)).toEqual(getModel(expected));
        expect(getCmd(actual)).toEqual(getCmd(expected));
      });

      it('clears search state', () => {
        const expected = {
          searchTerm: null,
          searchResults: null,
          searchMetadata: null
        };

        const actual = reducer(
          { searchTerm: 'foo', searchResults: {}, searchMetadata: {} },
          actions.clearSearch()
        );
        expect(actual).toEqual(expected);
      });
    });

    describe('search results metadata', () => {
      it('sets metadata for search results', () => {
        const expected = { searchMetadata: searchMetadataStubs };
        const actual = reducer({}, actions.onSearchMetadataSuccess({ data: searchMetadataStubs }));

        expect(actual).toEqual(expected);
      });

      it('handles metadata fetch failure', () => {
        const error = { message: 'foo' };
        const expected = { isLoading: false, error };
        const actual = reducer({ isLoading: true }, actions.onSearchMetadataFailure(error));

        expect(actual).toEqual(expected);
      });

      it('gets metadata', () => {
        const videoIds = searchResultsStubs.items.map(item => item.id.videoId);
        const state = {
          isLoading: false,
          searchResults: searchResultsStubs
        };
        const url = `https://www.googleapis.com/youtube/v3/videos?part=statistics,contentDetails&id=${videoIds.join(',')}&key=${KEY}`;
        const expected = loop(
          {
            isLoading: true,
            searchResults: searchResultsStubs
          },
          Cmd.run(
            axios.get,
            {
              args: [url],
              successActionCreator: actions.setSearchMetadata,
              failActionCreator: actions.onSearchMetadataFailure,
            }
          )
        );

        const actual = reducer(state, actions.getSearchMetadata());
        expect(getModel(actual)).toEqual(getModel(expected));
        expect(getCmd(actual)).toEqual(getCmd(expected));
      });
    });
  });
});
