import searchSelector from './selector';
import searchResultsStubs from './stubs/searchResultsStub';
import searchMetadataStubs from './stubs/searchMetadataStub';
import { combineSearchData } from '../utils';

describe('searchSelector', () => {
  describe('search term', () => {
    it('selects the current search term', () => {
      const searchTerm = 'foobar';
      const state = {
        search: {
          searchTerm,
          searchResults: { items: [] },
          searchMetadata: { items: [] }
        },
      };

      const expected = searchTerm;
      const actual = searchSelector(state).searchTerm;
      expect(actual).toBe(expected);
    });
  });

  describe('search results', () => {
    it('consolidates search results with metadata', () => {
      const state = {
        search: {
          searchResults: searchResultsStubs,
          searchMetadata: searchMetadataStubs
        }
      };

      const expected = combineSearchData(
        searchResultsStubs.items, searchMetadataStubs.items
      );

      const actual = searchSelector(state).searchResults;
      expect(actual).toEqual(expected);
    });
  });
});
