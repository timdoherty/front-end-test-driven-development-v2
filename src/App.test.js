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

    wrapper.find('SearchBar').props().onSearchChanged('foobar');
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

  function selectSearchResult(wrapper, resultIndex) {
    const searchResult = wrapper.find('SearchResultListContainer')
                         .prop('searchResults')[resultIndex];
    const searchResultPreview = wrapper.find('SearchResultListContainer')
                               .find('Preview')
                               .at(resultIndex);

    axios.get.mockImplementationOnce(() => {
      return Promise.resolve({ data: { items: [ searchResult ] } });
    });
    mockNowPlayingRequests();
    const searchResultLink = searchResultPreview.find('Link').find('a');
    searchResultLink.simulate('click', { button: 0 });
  }

  describe('search', () => {
    it('responds to a search request', async () => {
      const wrapper = mount(
        <App />
      );

      doSearch(wrapper);

      await asyncFlush();
      wrapper.update();

      const searchBar = wrapper.find('SearchBar');
      expect(searchBar.prop('searchTerm')).toBe('foobar');

      const searchResultList = wrapper.find('SearchResultListContainer')
      expect(searchResultList.prop('searchResults').length).toBe(searchResultsStubs.items.length);
    });
  });

  describe('now playing', () => {
    it('plays a video when a search result is clicked', async () => {
      const wrapper = mount(
        <App />
      );

      doSearch(wrapper);
      await asyncFlush();
      wrapper.update();

      const expected = searchSelector({
        search: {
          searchResults: searchResultsStubs,
          searchMetadata: searchMetadataStubs
        }
      }).searchResults[1];

      selectSearchResult(wrapper, 1);
      await asyncFlush();
      wrapper.update();

      const player = wrapper.find('Player');
      expect(player.prop('id')).toBe(expected.id);

      const commentsList = wrapper.find('Comment');
      expect(commentsList.length).toBe(commentsStubs.items.length);

      const relatedVideosList = wrapper.find('RelatedVideosContainer')
                                       .find('Preview');
      expect(relatedVideosList.length).toBe(relatedVideosStubs.items.length);
      wrapper.unmount()
    });

    it('sets a related video as the current video', async () => {
      history.pushState({}, '', '/')

      const wrapper = mount(
        <App />
      );

      doSearch(wrapper);
      await asyncFlush();
      wrapper.update();

      selectSearchResult(wrapper, 1);
      await asyncFlush();
      wrapper.update();

      const relatedVideosList = wrapper.find('RelatedVideosContainer')
                                       .find('Preview');

      const expected = nowPlayingSelector({
        nowPlaying: {
          relatedVideos: relatedVideosStubs,
          relatedVideoMetadata: relatedVideoMetadataStubs
        }
      }).relatedVideos[1];

      axios.get.mockImplementationOnce(() => {
        return Promise.resolve({ data: { items: [ expected ] } });
      });

      mockNowPlayingRequests();
      relatedVideosList.at(1).find('Link').find('a').simulate('click', { button: 0 });
      await asyncFlush();
      wrapper.update();


      const player = wrapper.find('Player');
      expect(player.prop('id')).toEqual(expected.id);
    });
  });
});
