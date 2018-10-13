import React from 'react';
import { shallow } from 'enzyme';
import { createStore } from 'redux';

import ListContainer from './ListContainer';
import commentsStub from '../../stubs/commentsStub';
import nowPlayingSelector from '../../selector';

describe('<ListContainer/>', () => {
  function getInitialState() {
    return {
      nowPlaying: {
        currentVideo: {},
        relatedVideos: { items: [] },
        comments: commentsStub,
      },
    };
  }

  let store;

  beforeEach(() => {
    const reducer = state => state;
    store = createStore(reducer, getInitialState());
  });

  describe('props', () => {
    it('correctly maps state to props', () => {
      const wrapper = shallow(<ListContainer />, { context: { store } });
      const expected = nowPlayingSelector(getInitialState()).comments;
      const actual = wrapper.prop('comments');
      expect(actual).toEqual(expected);
    });
  });
});
