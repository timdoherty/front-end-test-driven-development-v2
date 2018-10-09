import React from 'react';
import { shallow } from 'enzyme';
import { Avatar } from '@procore/core-react';

import Comment from './Comment';

const authorDisplayName = 'slyellow2 Music';
const authorProfileImageUrl = 'https://yt3.ggpht.com/-9Y-vqnI3MBY/AAAAAAAAAAI/AAAAAAAAAAA/sKN8Ocfc3Bw/s28-c-k-no-mo-rj-c0xffffff/photo.jpg';
const textDisplay = 'Thanks everyone! Just now I uploaded &quot;Last Train Home&quot; Extended version, please enjoy. \u003ca href=\"https://www.youtube.com/watch?v=4QdWRgNdir4\"\u003ehttps://www.youtube.com/watch?v=4QdWRgNdir4\u003c/a\u003e';
const likeCount = 7;
const dislikeCount = 9;

describe('<Comment/>', () => {
  function render() {
    return shallow(
      <Comment
        author={authorDisplayName}
        avatar={authorProfileImageUrl}
        commentText={textDisplay}
        likes={likeCount}
        dislikes={dislikeCount}
      />
    );
  }

  it('shows an avatar for the commenter', () => {
    const wrapper = render();
    const avatar = wrapper.find(Avatar.Portrait);
    expect(avatar.prop('imageUrl')).toBe(authorProfileImageUrl);
  });

  it('displays the name of the commenter', () => {
    const wrapper = render();
    expect(wrapper.findWhere(
      n => n.text() === authorDisplayName
    ).exists()).toBe(true);
  });

  it('displays the comment text', () => {
    const wrapper = render();
    expect(wrapper.findWhere(
      n => n.text() === textDisplay
    ).exists()).toBe(true);
  });

  it('displays how many likes the comment has', () => {
    const wrapper = render();
    expect(wrapper.findWhere(
      n => n.text() === `${likeCount}`
    ).exists()).toBe(true);
  });

  it('displays how many dislikes the comment has', () => {
    const wrapper = render();
    expect(wrapper.findWhere(
      n => n.text() === `${dislikeCount}`
    ).exists()).toBe(true);
  });
});
