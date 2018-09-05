import React from 'react';
import { shallow } from 'enzyme';
import { Avatar } from '@procore/core-react';

import Comment from './Comment';

describe('<Comment/>', () => {
  const comment = {
    "kind": "youtube#commentThread",
    "etag": "\"XI7nbFXulYBIpL0ayR_gDh3eu1k/MgdWrZUyS8NEgEwzAmma4RfMOKM\"",
    "id": "UgzOD6FWmCzCtsv0pFl4AaABAg",
    "snippet": {
      "videoId": "2Gm7L3LEyz8",
      "topLevelComment": {
        "kind": "youtube#comment",
        "etag": "\"XI7nbFXulYBIpL0ayR_gDh3eu1k/kGvIsrDpgZiGeM1bgrNIaoS713Y\"",
        "id": "UgzOD6FWmCzCtsv0pFl4AaABAg",
        "snippet": {
          "authorDisplayName": "slyellow2 Music",
          "authorProfileImageUrl": "https://yt3.ggpht.com/-9Y-vqnI3MBY/AAAAAAAAAAI/AAAAAAAAAAA/sKN8Ocfc3Bw/s28-c-k-no-mo-rj-c0xffffff/photo.jpg",
          "authorChannelUrl": "http://www.youtube.com/channel/UCTg2TIWiAgr0FduTohrzj1A",
          "authorChannelId": {
            "value": "UCTg2TIWiAgr0FduTohrzj1A"
          },
          "videoId": "2Gm7L3LEyz8",
          "textDisplay": "Thanks everyone! Just now I uploaded &quot;Last Train Home&quot; Extended version, please enjoy. \u003ca href=\"https://www.youtube.com/watch?v=4QdWRgNdir4\"\u003ehttps://www.youtube.com/watch?v=4QdWRgNdir4\u003c/a\u003e",
          "textOriginal": "Thanks everyone! Just now I uploaded \"Last Train Home\" Extended version, please enjoy. https://www.youtube.com/watch?v=4QdWRgNdir4",
          "canRate": true,
          "viewerRating": "none",
          "likeCount": 7,
          "dislikeCount": 9,
          "publishedAt": "2018-06-04T01:45:11.000Z",
          "updatedAt": "2018-06-04T01:45:11.000Z"
        }
      },
      "canReply": true,
      "totalReplyCount": 4,
      "isPublic": true
    }
  };

  it('shows an avatar for the commenter', () => {
    const wrapper = shallow(
      <Comment comment={comment}/>
    );
    const avatar = wrapper.find(Avatar.Portrait);
    expect(avatar.prop('imageUrl')).toBe(comment.snippet.topLevelComment.snippet.authorProfileImageUrl);
  });

  it('displays the name of the commenter', () => {
    const wrapper = shallow(
      <Comment comment={comment}/>
    );
    expect(wrapper.findWhere(
      n => n.text() === comment.snippet.topLevelComment.snippet.authorDisplayName
    ).exists()).toBe(true);
  });

  it('displays the comment text', () => {
    const wrapper = shallow(
      <Comment comment={comment}/>
    );
    expect(wrapper.findWhere(
      n => n.text() === comment.snippet.topLevelComment.snippet.textDisplay
    ).exists()).toBe(true);
  });

  it('displays how many likes the comment has', () => {
    const wrapper = shallow(
      <Comment comment={comment}/>
    );
    expect(wrapper.findWhere(
      n => n.text() === `${comment.snippet.topLevelComment.snippet.likeCount}`
    ).exists()).toBe(true);
  });

  it('displays how many dislikes the comment has', () => {
    const wrapper = shallow(
      <Comment comment={comment}/>
    );
    expect(wrapper.findWhere(
      n => n.text() === `${comment.snippet.topLevelComment.snippet.dislikeCount}`
    ).exists()).toBe(true);
  });
});
