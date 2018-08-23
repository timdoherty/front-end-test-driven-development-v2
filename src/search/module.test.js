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
  describe('search term', () => {
    it('sets the current search term', () => {
      const searchTerm = 'foobarbaz';
      const expected = { searchTerm };
      const actual = reducer({}, actions.setSearchTerm(searchTerm));

      expect(actual).toEqual(expected);
    });

    it('clears the current search term', () => {
      const expected = { searchTerm: null };
      const actual = reducer({ searchTerm: 'barbaz' }, actions.clearSearchTerm());

      expect(actual).toEqual(expected);
    });
  });

  describe('search results', () => {
    describe('search results', () => {
      it('gets search results', () => {
        const state = { isLoading: false };
        const searchTerm = 'heisenberg';
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${searchTerm}&maxResults=20&key=${KEY}`;
        const expected = loop(
          { isLoading: true },
          Cmd.run(
            axios.get,
            {
              args: [url],
              successActionCreator: actions.setSearchResults,
              failActionCreator: actions.onSearchFailure,
            }
          )
        );

        const actual = reducer(state, actions.doSearch(searchTerm));
        expect(getModel(actual)).toEqual(getModel(expected));
        expect(getCmd(actual)).toEqual(getCmd(expected));
      });

      it('sets the current search results', () => {
        const expected = { isLoading: false, searchResults: searchResultsStubs };
        const actual = reducer({}, actions.setSearchResults({ data: searchResultsStubs }));

        expect(actual).toEqual(expected);
      }); 

      it('clears the current search results', () => {
        const expected = { searchResults: null };
        const actual = reducer({ searchResults: searchResultsStubs }, actions.clearSearchResults());

        expect(actual).toEqual(expected);
      });

      it('handles search failure', () => {
        const error = { message: 'foo' };
        const expected = { isLoading: false, error };
        const actual = reducer({ isLoading: true }, actions.onSearchFailure(error));

        expect(actual).toEqual(expected);
      });
    });

    describe('search results metadata', () => {
      it('gets metadata', () => {
        const state = { isLoading: false };
        const url = 'bar/baz';
        const expected = loop(
          { isLoading: true },
          Cmd.run(
            axios.get,
            {
              args: [url],
              successActionCreator: actions.setSearchMetadata,
              failActionCreator: actions.onSearchMetadataFailure,
            }
          )
        );

        const actual = reducer(state, actions.getSearchMetadata(url));
        expect(getModel(actual)).toEqual(getModel(expected));
        expect(getCmd(actual)).toEqual(getCmd(expected));
      });

      it('sets metadata for search results', () => {
        const expected = { searchMetadata: searchMetadataStubs };
        const actual = reducer({}, actions.setSearchMetadata({ data: searchMetadataStubs }));

        expect(actual).toEqual(expected);
      });

      it('clears metadata for search results', () => {
        const expected = { searchMetadata: null };
        const actual = reducer({ searchMetadata: searchMetadataStubs }, actions.clearSearchMetadata());

        expect(actual).toEqual(expected);
      });

      it('handles metadata fetch failure', () => {
        const error = { message: 'foo' };
        const expected = { isLoading: false, error };
        const actual = reducer({ isLoading: true }, actions.onSearchMetadataFailure(error));

        expect(actual).toEqual(expected);
      });
    });
  });
});
