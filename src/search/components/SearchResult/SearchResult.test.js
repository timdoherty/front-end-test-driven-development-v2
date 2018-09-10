import React from 'react';
import { shallow } from 'enzyme';

import SearchResult from './SearchResult';
import Thumbnail from '../../../components/Thumbnail';
import searchResultsStubs from '../../stubs/searchResultsStub';
import searchMetadataStubs from '../../stubs/searchMetadataStub';
import searchSelector from '../../selector';

describe('<SearchResult/>', () => {
  const searchResult = searchSelector({
    search: {
      searchResults: searchResultsStubs, 
      searchMetadata: searchMetadataStubs
    }
  }).searchResults[0];

  it('displays a thumbnail', () => {
    const wrapper = shallow(
      <SearchResult result={searchResult} />
    );
    const thumbnail = wrapper.find(Thumbnail);
    expect(thumbnail.prop('imageUrl')).toBe(searchResult.snippet.thumbnails.default.url);
    expect(thumbnail.prop('height')).toBe(searchResult.snippet.thumbnails.default.height);
    expect(thumbnail.prop('width')).toBe(searchResult.snippet.thumbnails.default.width);
  });

  it('displays the video title', () => {
    const wrapper = shallow(
      <SearchResult result={searchResult} />
    );

    expect(wrapper.findWhere(
      node => node.text() === searchResult.snippet.title
    ).exists()).toBe(true);
  });

  it('displays the channel (author) title', () => {
    const wrapper = shallow(
      <SearchResult result={searchResult} />
    );

    expect(wrapper.findWhere(
      node => node.text() === searchResult.snippet.channelTitle
    ).exists()).toBe(true);
  });

  it('displays the view count for the video', () => {
    const wrapper = shallow(
      <SearchResult result={searchResult} />
    );

    expect(wrapper.findWhere(
      node => node.text() === `${searchResult.statistics.viewCount} views`
    ).exists()).toBe(true);
  });

  it('displays the video description', () => {
    const wrapper = shallow(
      <SearchResult result={searchResult} />
    );

    expect(wrapper.findWhere(
      node => node.text() === searchResult.snippet.description
    ).exists()).toBe(true);
  });

  it('responds with the video object when clicked', () => {
    const onClickMock = jest.fn();
    const wrapper = shallow(
      <SearchResult
        result={searchResult}
        onClick={onClickMock}
      />
    );

    wrapper.simulate('click');
    expect(onClickMock).toBeCalledWith(searchResult);
  });
});
