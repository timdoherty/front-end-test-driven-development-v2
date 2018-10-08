import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';

import Preview from './Preview';

const id = 'fo';
const channelTitle = 'foo';
const description = 'foobar';
const title = 'foobarbaz';
const viewCount = 'foobarbazbim'
const thumbnails = {
  default: {
    url: 'https://i.ytimg.com/vi/2Gm7L3LEyz8/default.jpg',
    width: 120,
    height: 90
  },
  medium: {
    url: 'https://i.ytimg.com/vi/2Gm7L3LEyz8/mqdefault.jpg',
    width: 320,
    height: 180
  },
  high: {
    url: 'https://i.ytimg.com/vi/2Gm7L3LEyz8/hqdefault.jpg',
    width: 480,
    height: 360
  }
};

describe('<Preview/>', () => {
  function render() {
    return shallow(
      <Preview
        channelTitle={channelTitle}
        description={description}
        id={id}
        thumbnail={thumbnails.default}
        title={title}
        viewCount={viewCount}
      />
    );
  }

  it('displays a thumbnail', () => {
    const wrapper = render();
    expect(wrapper.find('img').prop('src')).toBe(thumbnails.default.url);
    expect(wrapper.find('img').prop('height')).toBe(thumbnails.default.height);
    expect(wrapper.find('img').prop('width')).toBe(thumbnails.default.width);
  });

  it('displays the video title', () => {
    const wrapper = render();

    expect(wrapper.findWhere(
      node => node.text() === title
    ).exists()).toBe(true);
  });

  it('displays the channel title (author)', () => {
    const wrapper = render();

    expect(wrapper.findWhere(
      node => node.text() === channelTitle
    ).exists()).toBe(true);
  });

  it('displays the view count for the video', () => {
    const wrapper = render();

    expect(wrapper.findWhere(
      node => node.text() === `${viewCount} views`
    ).exists()).toBe(true);
  });

  it('displays the video description by default', () => {
    const wrapper = render();

    expect(wrapper.findWhere(
      node => node.text() === description
    ).exists()).toBe(true);
  });

  it('links to the right video', () => {
    const wrapper = render();

    expect(wrapper.find(Link).prop('to')).toBe(`/nowPlaying/${id}`);
  });
});
