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

  function render() {
    return shallow(
      <Player
        channelTitle={nowPlaying.snippet.channelTitle}
        description={nowPlaying.snippet.description}
        commentCount={nowPlaying.statistics.commentCount}
        dislikeCount={nowPlaying.statistics.dislikeCount}
        id={nowPlaying.id}
        likeCount={nowPlaying.statistics.likeCount}
        title={nowPlaying.snippet.title}
        viewCount={nowPlaying.statistics.viewCount}
      />
    );
  }


  it('renders a youtube player', () => {
    const wrapper = render();
    expect(wrapper.find('iframe').prop('src')).toMatch(nowPlaying.id);
  });

  it('displays the video title', () => {
    const wrapper = render();
    expect(wrapper.findWhere(
      n => n.text() === nowPlaying.snippet.title
    ).exists()).toBe(true);
  });

  it('displays the video description', () => {
    const wrapper = render();
    expect(wrapper.findWhere(
      n => n.text() === nowPlaying.snippet.description
    ).exists()).toBe(true);
  });

  it('displays the channel title', () => {
    const wrapper = render();
    expect(wrapper.findWhere(
      n => n.text() === nowPlaying.snippet.channelTitle
    ).exists()).toBe(true);
  });

  it('displays view count for the video', () => {
    const wrapper = render();
    expect(wrapper.findWhere(
      n => n.text() === `${nowPlaying.statistics.viewCount} views`
    ).exists()).toBe(true);
  });

  it('displays like count for the video', () => {
    const wrapper = render();
    expect(wrapper.findWhere(
      n => n.text() === nowPlaying.statistics.likeCount
    ).exists()).toBe(true);
  });

  it('displays dislike count for the video', () => {
    const wrapper = render();
    expect(wrapper.findWhere(
      n => n.text() === nowPlaying.statistics.dislikeCount
    ).exists()).toBe(true);
  });

  it('displays comment count for the video', () => {
    const wrapper = render();
    expect(wrapper.findWhere(
      n => n.text() === `${nowPlaying.statistics.commentCount} comments`
    ).exists()).toBe(true);
  });
});
