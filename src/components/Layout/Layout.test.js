import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router'

import Layout from './Layout';
import SearchBar from '../../search/components/SearchBar';
import SearchResultsListContainer from '../../search/components/List';
import Player from '../../nowPlaying/components/Player';
import Comments from '../../nowPlaying/components/Comments';
import RelatedVideos from '../../nowPlaying/components/RelatedVideos';

jest.mock('../../search/components/SearchBar', () => () => <div />);
jest.mock('../../search/components/List');
jest.mock('../../nowPlaying/components/Player', () => () => <div />);
jest.mock('../../nowPlaying/components/Comments');
jest.mock('../../nowPlaying/components/RelatedVideos');

function getSearchWrapper() {
  return mount(
    <MemoryRouter
      initialEntries={[ '/search/foo' ]}
      initialIndex={0}
    >
      <Layout />
    </MemoryRouter>
  );
}

function getNowPlayingWrapper() {
  return mount(
    <MemoryRouter
      initialEntries={[ '/now-playing/bar' ]}
      initialIndex={0}
    >
      <Layout />
    </MemoryRouter>
  );
}

describe('<Layout/>', () => {
  it('always displays a search bar', () => {
    const wrapper = mount(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );
    expect(wrapper.find(SearchBar).exists()).toBe(true);
  });

  describe('search', () => {
    it('displays search results when a search term is present', () => {
      const wrapper = getSearchWrapper();
      expect(wrapper.find(SearchResultsListContainer).exists()).toBe(true);
    });

    it('does not display a search results list when a video is selected', () => {
      const wrapper = getNowPlayingWrapper();
      expect(wrapper.find(SearchResultsListContainer).exists()).toBe(false);
    });
  });

  describe('now playing', () => {
    describe('when search a search term is present', () => {
      it('does not display a video player', () => {
        const wrapper = getSearchWrapper();
        expect(wrapper.find(Player).exists()).toBe(false);
      });

      it('does not display a comments list', () => {
        const wrapper = getSearchWrapper();
        expect(wrapper.find(Comments).exists()).toBe(false);
      });

      it('does not display a related videos list', () => {
        const wrapper = getSearchWrapper();
        expect(wrapper.find(RelatedVideos).exists()).toBe(false);
      });
    });

    describe('when a video is selected', () => {
      it('displays a video player', () => {
        const wrapper = getNowPlayingWrapper();
        expect(wrapper.find(Player).exists()).toBe(true);
      });

      it('displays a comments list', () => {
        const wrapper = getNowPlayingWrapper();
        expect(wrapper.find(Comments).exists()).toBe(true);
      });

      it('displays a related videos list', () => {
        const wrapper = getNowPlayingWrapper();
        expect(wrapper.find(RelatedVideos).exists()).toBe(true);
      });
    });
  });
});

