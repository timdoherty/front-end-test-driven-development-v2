import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import axios from 'axios';

import App from './App';
import searchResultsStubs from './search/stubs/searchResultsStub';
import searchMetadataStubs from './search/stubs/searchMetadataStub';
import commentsStubs from './nowPlaying/stubs/commentsStub';
import relatedVideosStubs from './nowPlaying/stubs/relatedVideosStub';
import relatedVideoMetadataStubs from './nowPlaying/stubs/relatedVideoMetadataStub';
import searchSelector from './search/selector';
import nowPlayingSelector from './nowPlaying/selector';

jest.mock('axios');

function asyncFlush() {
  return new Promise(resolve => setTimeout(resolve, 0));
}

describe('<App/>', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  function doSearch(wrapper) {
    const searchResponse = searchResultsStubs;
    axios.get.mockImplementationOnce(() => {
      return Promise.resolve({ data: searchResponse });
    });

    const metaResponse = searchMetadataStubs;
    axios.get.mockImplementationOnce(() => {
      return Promise.resolve({ data: metaResponse });
    });

    wrapper
      .find('SearchBar')
      .props()
      .onSearchChanged('foobar');
  }

  function mockNowPlayingRequests() {
    axios.get.mockImplementationOnce(() => {
      return Promise.resolve({ data: commentsStubs });
    });

    axios.get.mockImplementationOnce(() => {
      return Promise.resolve({ data: relatedVideosStubs });
    });

    axios.get.mockImplementationOnce(() => {
      return Promise.resolve({ data: relatedVideoMetadataStubs });
    });
  }

  function clickPreviewLink(list, index, propName) {
    const data = list.prop(propName)[index];
    const link = list
      .find('Preview')
      .at(index)
      .find('Link')
      .find('a');

    axios.get.mockImplementationOnce(() => {
      return Promise.resolve({
        data: {
          items: [
            {
              id: data.id,
              snippet: {
                title: data.title,
                description: data.description,
                thumbnails: data.thumbnails,
                channelTitle: data.channelTitle,
              },
              contentDetails: {
                duration: data.duration,
              },
              statistics: {
                viewCount: data.viewCount,
                likeCount: data.likeCount,
                dislikeCount: data.dislikeCount,
                commentCount: data.commentCount,
              },
            },
          ],
        },
      });
    });
    mockNowPlayingRequests();
    link.simulate('click', { button: 0 });
  }

  describe('search', () => {
    it('responds to a search request', async () => {
      const wrapper = mount(<App />);

      doSearch(wrapper);

      await asyncFlush();
      wrapper.update();

      const searchBar = wrapper.find('SearchBar');
      expect(searchBar.prop('searchTerm')).toBe('foobar');

      const searchResultList = wrapper.find('SearchResultListContainer');
      expect(searchResultList.prop('searchResults').length).toBe(
        searchResultsStubs.items.length
      );
    });
  });

  describe('now playing', () => {
    it('plays a video when a search result is clicked', async () => {
      const wrapper = mount(<App />);

      doSearch(wrapper);
      await asyncFlush();
      wrapper.update();

      const expected = searchSelector({
        search: {
          searchResults: searchResultsStubs,
          searchMetadata: searchMetadataStubs,
        },
      }).searchResults[1];

      clickPreviewLink(
        wrapper.find('SearchResultListContainer'),
        1,
        'searchResults'
      );
      await asyncFlush();
      wrapper.update();

      const player = wrapper.find('Player');
      expect(player.prop('id')).toBe(expected.id);

      const commentsList = wrapper.find('Comment');
      expect(commentsList.length).toBe(commentsStubs.items.length);

      const relatedVideosList = wrapper
        .find('RelatedVideosContainer')
        .find('Preview');
      expect(relatedVideosList.length).toBe(relatedVideosStubs.items.length);
      wrapper.unmount();
    });

    it('sets a related video as the current video', async () => {
      history.pushState({}, '', '/');

      const wrapper = mount(<App />);

      doSearch(wrapper);
      await asyncFlush();
      wrapper.update();

      clickPreviewLink(
        wrapper.find('SearchResultListContainer'),
        1,
        'searchResults'
      );
      await asyncFlush();
      wrapper.update();

      const relatedVideosList = wrapper
        .find('RelatedVideosContainer')
        .find('Preview');

      const expected = nowPlayingSelector({
        nowPlaying: {
          relatedVideos: relatedVideosStubs,
          relatedVideoMetadata: relatedVideoMetadataStubs,
        },
      }).relatedVideos[1];

      // axios.get.mockImplementationOnce(() => {
      //   return Promise.resolve({ data: { items: [expected] } });
      // });

      // mockNowPlayingRequests();
      // relatedVideosList
      //   .at(1)
      //   .find('Link')
      //   .find('a')
      //   .simulate('click', { button: 0 });
      clickPreviewLink(
        wrapper.find('RelatedVideosContainer'),
        1,
        'relatedVideos'
      );
      await asyncFlush();
      wrapper.update();

      const player = wrapper.find('Player');
      expect(player.prop('id')).toEqual(expected.id);
    });
  });
});
