import React from 'react';
import { shallow } from 'enzyme';

import Player from './Player';

describe('<Player/>', () => {
  const nowPlaying = {
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
      commentCount: '333'
    },
    contentDetails: {
      duration: '00:05:32'
    }
  };

  it('renders a youtube player', () => {
    const wrapper = shallow(
      <Player video={nowPlaying} />
    );
    expect(wrapper.find('iframe').prop('src')).toMatch(nowPlaying.id);
  });

  it('displays the video title', () => {
    const wrapper = shallow(
      <Player video={nowPlaying} />
    );
    expect(wrapper.findWhere(
      n => n.text() === nowPlaying.snippet.title
    ).exists()).toBe(true);
  });

  it('displays the video description', () => {
    const wrapper = shallow(
      <Player video={nowPlaying} />
    );
    expect(wrapper.findWhere(
      n => n.text() === nowPlaying.snippet.description
    ).exists()).toBe(true);
  });

  it('displays the channel title', () => {
    const wrapper = shallow(
      <Player video={nowPlaying} />
    );
    expect(wrapper.findWhere(
      n => n.text() === nowPlaying.snippet.channelTitle
    ).exists()).toBe(true);
  });

  it('displays view count for the video', () => {
    const wrapper = shallow(
      <Player video={nowPlaying} />
    );
    expect(wrapper.findWhere(
      n => n.text() === `${nowPlaying.statistics.viewCount} views`
    ).exists()).toBe(true);
  });

  it('displays like count for the video', () => {
    const wrapper = shallow(
      <Player video={nowPlaying} />
    );
    expect(wrapper.findWhere(
      n => n.text() === nowPlaying.statistics.likeCount
    ).exists()).toBe(true);
  });

  it('displays dislike count for the video', () => {
    const wrapper = shallow(
      <Player video={nowPlaying} />
    );
    expect(wrapper.findWhere(
      n => n.text() === nowPlaying.statistics.dislikeCount
    ).exists()).toBe(true);
  });

  it('displays comment count for the video', () => {
    const wrapper = shallow(
      <Player video={nowPlaying} />
    );
    expect(wrapper.findWhere(
      n => n.text() === `${nowPlaying.statistics.commentCount} comments`
    ).exists()).toBe(true);
  });
});
