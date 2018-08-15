import searchSelector from './selector';

describe('searchSelector', () => {
  it('selects the current search term', () => {
    const searchTerm = 'foobar';
    const state = {
      search: { searchTerm }
    };

    const expected = searchTerm;
    const actual = searchSelector(state).searchTerm;
    expect(actual).toBe(expected);
  })
});
