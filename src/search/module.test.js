import searchModule from './module';

const { actions, reducer } = searchModule;

describe('searchModule', () => {
  describe('search', () => {
    it('performs a search', () => {
      const searchTerm = 'foobar';
      const expected = {
        isLoading: true,
        searchTerm
      };

      const actual = reducer({ isLoading: false }, actions.doSearch(searchTerm));
      expect(actual).toEqual(expected);
    });

    it('handles a successful search', () => {
      const searchResults = {
        items: [ { foo: 'bar' } ]
      };

      const expected = {
        isLoading: false,
        searchResults
      };

      const actual = reducer({ isLoading: true }, actions.onSearchSuccess({ data: searchResults }));
      expect(actual).toEqual(expected);
    });

    it('handles a search failure', () => {
      const error = { bad: 'stuff' };
      const expected = {
        isLoading: false,
        error
      };

      const actual = reducer({ isLoading: true }, actions.onSearchFailure(error));
      expect(actual).toEqual(expected);
    });
  });

  describe('search metadata', () => {
    it('gets search metadata', () => {
      const expected = {
        isLoading: true
      };

      const actual = reducer({ isLoading: false }, actions.getSearchMetadata());
      expect(actual).toEqual(expected);
    });

    it('handles metadata success', () => {
      const searchMetadata = { items: [ { foo: 'bar' } ] };
      const expected = {
        isLoading: false,
        searchMetadata
      };

      const actual = reducer({ isLoading: true }, actions.onSearchMetadataSuccess({ data: searchMetadata }));
      expect(actual).toEqual(expected);
    });

    it('handles metadata failure', () => {
      const error = { messed: 'up' };
      const expected = {
        isLoading: false,
        error
      };

      const actual = reducer({ isLoading: true }, actions.onSearchMetadataFailure(error));
      expect(actual).toEqual(expected);
    });
  });
});
