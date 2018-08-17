import searchModule from './module';
import searchResultsStubs from './stubs/searchResultsStub';
import searchMetadataStubs from './stubs/searchMetadataStub';

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
      it('sets the current search results', () => {
        const expected = { searchResults: searchResultsStubs };
        const actual = reducer({}, actions.setSearchResults({ data: searchResultsStubs }));

        expect(actual).toEqual(expected);
      }); 

      it('clears the current search results', () => {
        const expected = { searchResults: null };
        const actual = reducer({ searchResults: searchResultsStubs }, actions.clearSearchResults());

        expect(actual).toEqual(expected);
      });
    });

    describe('search results metadata', () => {
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
    });
  });
});
