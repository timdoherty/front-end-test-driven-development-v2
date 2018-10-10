import React from 'react';
import { shallow } from 'enzyme';
import { createStore } from 'redux';

import ListContainer from './ListContainer';
import commentsStub from '../../stubs/commentsStub';

describe('<ListContainer/>', () => {
  function getInitialState() {
    return {
      nowPlaying: {
        currentVideo: { items: [] },
        relatedVideos: { items: [] },
        comments: commentsStub
      }
    };
  }

  let store;

  beforeEach(() => {
    const reducer = state => state; 
    store = createStore(reducer, getInitialState());
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
