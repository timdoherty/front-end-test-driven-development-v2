import React from 'react';
import { shallow } from 'enzyme';

import List from './List';
import SearchResult from '../SearchResult/SearchResult';
import searchResultStubs from '../../stubs/searchResultsStub';
import searchMetadataStubs from '../../stubs/searchMetadataStub';
import searchSelector from '../../selector';

describe('<List/>', () => {
  let searchResults = searchSelector({
    search: {
      searchResults: searchResultStubs,
      searchMetadata: searchMetadataStubs
    }
  }).searchResults;

  it('displays a search result for each item', () => {
    const wrapper = shallow(
      <List searchResults={searchResults} />
    );
    expect(wrapper.find(SearchResult).length).toBe(searchResults.length);
  });

  it('responds with the right video when an item is clicked', () => {
    const onListItemClickedMock = jest.fn();
    const wrapper = shallow(
      <List
        searchResults={searchResults}
        onListItemClicked={onListItemClickedMock}
      />
    );

    const searchResult = wrapper.find(SearchResult).at(3); 
    searchResult.props().onClick(searchResult.prop('result'));
    expect(onListItemClickedMock).toBeCalledWith(searchResults[3]);
  });
});
