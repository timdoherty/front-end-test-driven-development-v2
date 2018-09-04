import React from 'react';
import { shallow, mount } from 'enzyme';
import { createStore } from 'redux';

import RelatedVideosContainer from './Container';
import relatedVideoStubs from '../../stubs/relatedVideosStub';
import relatedVideoMetadataStbus from '../../stubs/relatedVideoMetadataStub';
import nowPlayingSelector from '../../selector';
import nowPlayingModule from '../../../nowPlaying/module';
import List from '../../../components/List';

const { actions } = nowPlayingModule;

describe('<RelatedVideosContainer/>', () => {
  function getInitialState() {
    return {
      nowPlaying: {
        comments: { items: [] },
        relatedVideos: relatedVideoStubs,
        relatedVideoMetadata: relatedVideoMetadataStbus 
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

  describe('props', () => {
    it('correctly maps state to props', () => {
      const wrapper = shallow(
        <RelatedVideosContainer />,
        { context: { store } }
      );
      const expected = nowPlayingSelector(getInitialState()).relatedVideos;
      const actual = wrapper.prop('relatedVideos');
      expect(actual).toEqual(expected);
    });
  });

  describe('dispatch', () => {
    it('correctly maps dispatch to props', () => {
      const wrapper = mount(
        <RelatedVideosContainer />,
        { context: { store } }
      )
      const relatedVideos = nowPlayingSelector(getInitialState()).relatedVideos;
      const list = wrapper.find(List);
      list.props().onListItemClicked(list.prop('listItems')[3]);
      expect(dispatch).toBeCalledWith(actions.setCurrentVideo(relatedVideos[3]));
    });
  })
});
