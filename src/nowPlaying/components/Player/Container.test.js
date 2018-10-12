import React from 'react';
import { shallow, mount } from 'enzyme';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { Route } from 'react-router-dom';

import PlayerContainer from './Container';
import Player from './Player';
import nowPlayingModule from '../../module';

const { actions } = nowPlayingModule;

describe('<PlayerContainer/>', () => {
  function getInitialState() {
    return {
      nowPlaying: {
        currentVideo: {
          items: [
            {
              id: 'foobarbaz',
              snippet: {
                title: 'Foo Bar Baz',
                description: 'This is the Foo Bar Baz video.',
                channelTitle: 'FooBarBaz channel',
              },
              statistics: {
                viewCount: '100000000',
                likeCount: '50000',
                dislikeCount: '3',
                favoriteCount: '1',
                commentCount: '333',
              },
              contentDetails: {
                duration: '00:05:32',
              },
            },
          ],
        },
        relatedVideos: { items: [] },
        comments: { items: [] },
      },
    };
  }

  let store;
  let dispatch;

  beforeEach(() => {
    const reducer = state => state;
    dispatch = jest.fn();
    store = {
      ...createStore(reducer, getInitialState()),
      dispatch,
    };
  });

  it('has a current video to play', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <PlayerContainer />
        </MemoryRouter>
      </Provider>
    );
    const expected = getInitialState().nowPlaying.currentVideo.items[0];
    const actual = wrapper.find(Player).prop('id');
    expect(actual).toEqual(expected.id);
  });

  it('gets the current video on sartup', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/nowPlaying/foobar']} initialIndex={0}>
          <Route
            path="/nowPlaying/:videoid"
            render={() => <PlayerContainer />}
          />
        </MemoryRouter>
      </Provider>
    );

    expect(dispatch).toBeCalledWith(actions.getCurrentVideo('foobar'));
  });
});
