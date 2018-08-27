import React from 'react';
import { shallow } from 'enzyme';
import { createStore } from 'redux';

import PlayerContainer from './Container';

describe('<PlayerContainer/>', () => {
  function getInitialState() {
    return {
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

  describe('props', () => {
    it('correctly maps state to props', () => {
      const wrapper = shallow(
        <PlayerContainer />,
        { context: { store } }
      );
      const expected = getInitialState().nowPlaying.currentVideo;
      const actual = wrapper.prop('currentVideo');
      expect(actual).toEqual(expected);
    });
  });
});
