import searchModule from './module';

const { actions, reducer } = searchModule;

describe('searchModule', () => {
  it('sets the current search term', () => {
    const searchTerm = 'foobarbaz';
    const expected = { searchTerm };
    const actual = reducer({}, actions.setSearchTerm(searchTerm));

    expect(actual).toEqual(expected);
  });

  it('clears the current search term', () => {
    const expected = { searchTerm: null };
    const actual = reducer({}, actions.clearSearchTerm());

    expect(actual).toEqual(expected);
  });
});
