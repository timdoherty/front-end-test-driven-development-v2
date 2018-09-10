import React from 'react';
import { mount } from 'enzyme';
import { createStore } from 'redux';

import Layout from '../Layout';
import SearchBar from '../../search/components/SearchBar';
import SearchResultsListContainer from '../../search/components/List';
import Player from '../../nowPlaying/components/Player';
import Comments from '../../nowPlaying/components/Comments';
import RelatedVideos from '../../nowPlaying/components/RelatedVideos';

jest.mock('../../search/components/SearchBar');
jest.mock('../../search/components/List');
jest.mock('../../nowPlaying/components/Player');
jest.mock('../../nowPlaying/components/Comments');
jest.mock('../../nowPlaying/components/RelatedVideos');

describe('<Layout/>', () => {
  let store;
  let dispatch;

  beforeEach(() => {
    const reducer = state => state; 
    dispatch = jest.fn();
    store = {
      ...createStore(reducer, { nowPlaying: { currentVideo: {} } }),
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
          { nowPlaying: { currentVideo: null } }
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
    const wrapper = mount(
      <Layout />,
      { context: { store }}
    );
    expect(wrapper.find(Player).exists()).toBe.true;
  });

  it('displays a comments list', () => {
    const wrapper = mount(
      <Layout />,
      { context: { store }}
    );
    expect(wrapper.find(Comments).exists()).toBe.true;
  });

  it('displays a related videos list', () => {
    const wrapper = mount(
      <Layout />,
      { context: { store }}
    );
    expect(wrapper.find(RelatedVideos).exists()).toBe.true;
  });
});
