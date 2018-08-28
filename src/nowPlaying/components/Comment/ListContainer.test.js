import React from 'react';
import { shallow, mount } from 'enzyme';
import { createStore } from 'redux';

import ListContainer from './ListContainer';
import commentsStub from '../../stubs/commentsStub';

describe('<ListContainer/>', () => {
  function getInitialState() {
    return {
      nowPlaying: {
        currentVideo: {},
        relatedVideos: { items: [] },
        comments: commentsStub
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
        <ListContainer />,
        { context: { store } }
      );
      const expected = getInitialState().nowPlaying.comments.items;
      const actual = wrapper.prop('comments');
      expect(actual).toEqual(expected);
    });
  });
});
