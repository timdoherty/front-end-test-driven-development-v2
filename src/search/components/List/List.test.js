import React from 'react';
import { shallow } from 'enzyme';

import List from './List';
import Preview from '../../../components/Preview';
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
    expect(wrapper.find(Preview).length).toBe(searchResults.length);
  });

  it('responds with the right video when an item is clicked', () => {
    const onListItemClickedMock = jest.fn();
    const wrapper = shallow(
      <List
        searchResults={searchResults}
        onListItemClicked={onListItemClickedMock}
      />
    );

    const preview = wrapper.find(Preview).at(3); 
    preview.props().onClick(preview.prop('result'));
    expect(onListItemClickedMock).toBeCalledWith(searchResults[3]);
  });
});
