import searchModule from './module';

const { actions, reducer } = searchModule;

describe('searchModule', () => {
  it('sets the current search term', () => {
    const term = 'foobarbaz';
    const expected = { searchTerm: term };
    const actual = reducer({}, actions.setSearchTerm(term));

    expect(actual).toEqual(expected);
  });

  it('clears the current search term', () => {
    const expected = { searchTerm: null };
    const actual = reducer({}, actions.clearSearchTerm());

    expect(actual).toEqual(expected);
  });
});
