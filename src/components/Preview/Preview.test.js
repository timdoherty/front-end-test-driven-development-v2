import React from 'react';
import { shallow } from 'enzyme';

import Preview from './Preview';
import Thumbnail from '../Thumbnail';
import searchResultsStubs from '../../stubs/searchResultsStub';
import searchMetadataStubs from '../../stubs/searchMetadataStub';
import searchSelector from '../../selector';

describe('<Preview/>', () => {
  const searchResult = searchSelector({
    search: {
      searchResults: searchResultsStubs, 
      searchMetadata: searchMetadataStubs
    }
  }).searchResults[0];

  describe('thumbnail', () => {
    it('displays a default thumbnail', () => {
      const wrapper = shallow(
        <Preview result={searchResult} />
      );
      const thumbnail = wrapper.find(Thumbnail);
      expect(thumbnail.prop('imageUrl')).toBe(searchResult.snippet.thumbnails.default.url);
      expect(thumbnail.prop('height')).toBe(searchResult.snippet.thumbnails.default.height);
      expect(thumbnail.prop('width')).toBe(searchResult.snippet.thumbnails.default.width);
    });

    it('displays a specified thumbnail', () => {
      const wrapper = shallow(
        <Preview
          result={searchResult}
          thumbnailSize="medium"
        />
      );
      const thumbnail = wrapper.find(Thumbnail);
      expect(thumbnail.prop('imageUrl')).toBe(searchResult.snippet.thumbnails.medium.url);
      expect(thumbnail.prop('height')).toBe(searchResult.snippet.thumbnails.medium.height);
      expect(thumbnail.prop('width')).toBe(searchResult.snippet.thumbnails.medium.width);
    });
  });

  it('displays the video title', () => {
    const wrapper = shallow(
      <Preview result={searchResult} />
    );

    expect(wrapper.findWhere(
      node => node.text() === searchResult.snippet.title
    ).exists()).toBe(true);
  });

  it('displays the channel title (author)', () => {
    const wrapper = shallow(
      <Preview result={searchResult} />
    );

    expect(wrapper.findWhere(
      node => node.text() === searchResult.snippet.channelTitle
    ).exists()).toBe(true);
  });

  it('displays the view count for the video', () => {
    const wrapper = shallow(
      <Preview result={searchResult} />
    );

    expect(wrapper.findWhere(
      node => node.text() === `${searchResult.statistics.viewCount} views`
    ).exists()).toBe(true);
  });

  describe('description', () => {
    it('displays the video description by default', () => {
      const wrapper = shallow(
        <Preview result={searchResult} />
      );

      expect(wrapper.findWhere(
        node => node.text() === searchResult.snippet.description
      ).exists()).toBe(true);
    });

    it('does not display the video description when specified', () => {
      const wrapper = shallow(
        <Preview
          result={searchResult}
          hideDescription={true}
        />
      );

      expect(wrapper.findWhere(
        node => node.text() === searchResult.snippet.description
      ).exists()).toBe(false);
    });
  });

  it('responds with the video object when clicked', () => {
    const onClickMock = jest.fn();
    const wrapper = shallow(
      <Preview
        result={searchResult}
        onClick={onClickMock}
      />
    );

    wrapper.simulate('click');
    expect(onClickMock).toBeCalledWith(searchResult);
  });
});
