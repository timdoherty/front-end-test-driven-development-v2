import React from 'react';
import { shallow } from 'enzyme';
import { createStore } from 'redux';

import SearchResultListContainer from './Container';
import List from '../../../components/List';
import searchResultStubs from '../../stubs/searchResultsStub';
import searchMetadataStubs from '../../stubs/searchMetadataStub';
import searchSelector from '../../selector';

describe('<SearchResultListContainer/>', () => {
  function getInitialState() {
    return {
      search: {
        searchResults: searchResultStubs,
        searchMetadata: searchMetadataStubs 
      },
    };
  }

  let store;

  beforeEach(() => {
    const reducer = state => state; 
    store = createStore(reducer, getInitialState());
  });

  describe('props', () => {
    it('correctly maps state to props', () => {
      const wrapper = shallow(
        <SearchResultListContainer />,
        { context: { store } }
      );
      const expected = searchSelector(getInitialState()).searchResults;
      const actual = wrapper.dive().dive().find(List).prop('listItems');
      expect(actual).toEqual(expected);
    });
  });
});
