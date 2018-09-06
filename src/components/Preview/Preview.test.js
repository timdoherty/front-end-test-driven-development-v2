import React from 'react';
import { shallow } from 'enzyme';

import Preview from './Preview';
import Thumbnail from '../Thumbnail';

describe('<Preview/>', () => {
  const searchResult = {
   "kind": "youtube#searchResult",
   "etag": "\"XI7nbFXulYBIpL0ayR_gDh3eu1k/Va5WaCfLWg9_P0lB4Olj9aRA5ZI\"",
   "id": {
    "kind": "youtube#video",
    "videoId": "2Gm7L3LEyz8"
   },
   "snippet": {
    "publishedAt": "2017-09-09T02:09:57.000Z",
    "channelId": "UCTg2TIWiAgr0FduTohrzj1A",
    "title": "Pat Metheny Group - To The End of the World (1 Hour Extended)",
    "description": "1 Hour extend of My favorite Metheny's song. Please check also my House Remix for this song. Pat Metheny - To the End of the World (Ymbk Borraginol Edit) ...",
    "thumbnails": {
     "default": {
      "url": "https://i.ytimg.com/vi/2Gm7L3LEyz8/default.jpg",
      "width": 120,
      "height": 90
     },
     "medium": {
      "url": "https://i.ytimg.com/vi/2Gm7L3LEyz8/mqdefault.jpg",
      "width": 320,
      "height": 180
     },
     "high": {
      "url": "https://i.ytimg.com/vi/2Gm7L3LEyz8/hqdefault.jpg",
      "width": 480,
      "height": 360
     }
    },
    "channelTitle": "slyellow2 Music",
    "liveBroadcastContent": "none"
   },
   "id": "2Gm7L3LEyz8",
   "contentDetails": {
    "duration": "PT58M54S",
    "dimension": "2d",
    "definition": "hd",
    "caption": "false",
    "licensedContent": false,
    "projection": "rectangular"
   },
   "statistics": {
    "viewCount": "619624",
    "likeCount": "4039",
    "dislikeCount": "238",
    "favoriteCount": "0",
    "commentCount": "323"
   }
  };

  describe('thumbnail', () => {
    it('displays a default thumbnail', () => {
      const wrapper = shallow(
        <Preview result={searchResult} />
      );
      const thumbnail = wrapper.find(Thumbnail);
      expect(thumbnail.prop('imageUrl')).toBe(searchResult.snippet.thumbnails.medium.url);
      expect(thumbnail.prop('height')).toBe(searchResult.snippet.thumbnails.medium.height);
      expect(thumbnail.prop('width')).toBe(searchResult.snippet.thumbnails.medium.width);
    });

    it('displays a specified thumbnail', () => {
      const wrapper = shallow(
        <Preview
          result={searchResult}
          thumbnailSize="high"
        />
      );
      const thumbnail = wrapper.find(Thumbnail);
      expect(thumbnail.prop('imageUrl')).toBe(searchResult.snippet.thumbnails.high.url);
      expect(thumbnail.prop('height')).toBe(searchResult.snippet.thumbnails.high.height);
      expect(thumbnail.prop('width')).toBe(searchResult.snippet.thumbnails.high.width);
    });
  });

  it('displays the video title', () => {
    const wrapper = shallow(
      <Preview result={searchResult} />
    );

    expect(wrapper.findWhere(
      node => node.text() === searchResult.snippet.title
    ).exists()).toBe(true);
  });

  it('displays the channel title (author)', () => {
    const wrapper = shallow(
      <Preview result={searchResult} />
    );

    expect(wrapper.findWhere(
      node => node.text() === searchResult.snippet.channelTitle
    ).exists()).toBe(true);
  });

  it('displays the view count for the video', () => {
    const wrapper = shallow(
      <Preview result={searchResult} />
    );

    expect(wrapper.findWhere(
      node => node.text() === `${searchResult.statistics.viewCount} views`
    ).exists()).toBe(true);
  });

  describe('description', () => {
    it('displays the video description by default', () => {
      const wrapper = shallow(
        <Preview result={searchResult} />
      );

      expect(wrapper.findWhere(
        node => node.text() === searchResult.snippet.description
      ).exists()).toBe(true);
    });

    it('does not display the video description when specified', () => {
      const wrapper = shallow(
        <Preview
          result={searchResult}
          hideDescription={true}
        />
      );

      expect(wrapper.findWhere(
        node => node.text() === searchResult.snippet.description
      ).exists()).toBe(false);
    });
  });

  it('displays the video duration', () => {
    const wrapper = shallow(
      <Preview result={searchResult} />
    );

    expect(wrapper.findWhere(
      node => node.text() === searchResult.contentDetails.duration
    ).exists()).toBe(true);
  });

  it('responds with the video object when clicked', () => {
    const onClickMock = jest.fn();
    const wrapper = shallow(
      <Preview
        result={searchResult}
        onClick={onClickMock}
      />
    );

    wrapper.simulate('click');
    expect(onClickMock).toBeCalledWith(searchResult);
  });
});
