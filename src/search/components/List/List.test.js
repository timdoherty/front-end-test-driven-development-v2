import React from 'react';
import { shallow } from 'enzyme';

import List from './List';
import SearchResult from '../SearchResult/SearchResult';
import searchResultStubs from '../../stubs/searchResultsStub';
import searchMetadataStubs from '../../stubs/searchMetadataStub';
import searchSelector from '../../selector';

describe('<List/>', () => {
  let searchResults;
  beforeEach(() => {
    const state = {
      search: {
        searchResults: searchResultStubs,
        searchMetadata: searchMetadataStubs
      }
    };
    searchResults = searchSelector(state).searchResults;
  });

  it('displays a search result for each item', () => {
    const wrapper = shallow(
      <List searchResults={searchResults} />
    );
    expect(wrapper.find(SearchResult).length).toBe(searchResults.length);
  });

  it('responds with the right video id when an item is clicked', () => {
    const onListItemClickedMock = jest.fn();
    const wrapper = shallow(
      <List
        searchResults={searchResults}
        onListItemClicked={onListItemClickedMock}
      />
    );

    wrapper.find('SearchResult').at(3).dive().simulate('click');
    expect(onListItemClickedMock).toBeCalledWith(searchResults[3]);
  });
});
