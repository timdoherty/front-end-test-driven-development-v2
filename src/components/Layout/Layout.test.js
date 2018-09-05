import React from 'react';
import { shallow, mount } from 'enzyme';
import { createStore } from 'redux';

import Layout from '../Layout';
import SearchBar from '../../search/components/SearchBar';
import SearchResultsListContainer from '../../search/components/List';
import Player from '../../nowPlaying/components/Player';
import Comments from '../../nowPlaying/components/Comments';
import RelatedVideos from '../../nowPlaying/components/RelatedVideos';

describe('<Layout/>', () => {
  function getInitialState() {
    return {
      search: {
        searchResults: { items: [] },
        searchMetadata: { items: [] }
      },
      nowPlaying: {
        currentVideo: {
          id: 'foobarbaz',
          snippet: {
            title: 'Foo Bar Baz',
            description: 'This is the Foo Bar Baz video.',
            channelTitle: 'FooBarBaz channel'
          },
          statistics: {
            viewCount: '100000000',
            likeCount: '50000',
            dislikeCount: '3',
            favoriteCount: '1',
            commentCount: '333'
          },
          contentDetails: {
            duration: '00:05:32'
          }
        },
        relatedVideos: { items: [] },
        comments: { items: [] }
      }
    };
  }

  let store;
  let dispatch;

  beforeEach(() => {
    const reducer = state => state; 
    dispatch = jest.fn();
    store = {
      ...createStore(reducer, getInitialState()),
      dispatch
    };
  });

  it('displays a search bar', () => {
    const wrapper = mount(
      <Layout />,
      { context: { store }}
    );
    expect(wrapper.find(SearchBar).exists()).toBe.true;
  });

  describe('search results', () => {
    it('displays search results when no video is selected', () => {
      store = {
        ...createStore(
          state => state,
          {
            ...getInitialState(),
            nowPlaying: {
              currentVideo: null
            }
          }
        ),
        dispatch
      };
      const wrapper = mount(
        <Layout />,
        { context: { store }}
      );

      expect(wrapper.find(SearchResultsListContainer).exists()).toBe(true);
    });

    it('does not display a search results list when a video is selected', () => {
      const wrapper = mount(
        <Layout />,
        { context: { store }}
      );

      expect(wrapper.find(SearchResultsListContainer).exists()).toBe(false);
    });
  });

  it('displays a video player', () => {
    const wrapper = shallow(
      <Layout />,
      { context: { store }}
    );
    expect(wrapper.find(Player).exists()).toBe.true;
  });

  it('displays a comments list', () => {
    const wrapper = shallow(
      <Layout />,
      { context: { store }}
    );
    expect(wrapper.find(Comments).exists()).toBe.true;
  });

  it('displays a related videos list', () => {
    const wrapper = shallow(
      <Layout />,
      { context: { store }}
    );
    expect(wrapper.find(RelatedVideos).exists()).toBe.true;
  });
});
