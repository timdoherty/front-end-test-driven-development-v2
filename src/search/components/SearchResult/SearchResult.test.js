import React from 'react';
import { shallow } from 'enzyme';

import SearchResult from './SearchResult';
import Thumbnail from '../../../components/Thumbnail';

describe('<SearchResult/>', () => {
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

  it('displays a thumbnail', () => {
    const wrapper = shallow(
      <SearchResult result={searchResult} />
    );
    const thumbnail = wrapper.find(Thumbnail);
    expect(thumbnail.prop('imageUrl')).toBe(searchResult.snippet.thumbnails.default.url);
    expect(thumbnail.prop('height')).toBe(searchResult.snippet.thumbnails.default.height);
    expect(thumbnail.prop('width')).toBe(searchResult.snippet.thumbnails.default.width);
  });

  it('displays the video title', () => {
    const wrapper = shallow(
      <SearchResult result={searchResult} />
    );

    expect(wrapper.findWhere(
      node => node.text() === searchResult.snippet.title
    ).exists()).toBe(true);
  });

  it('displays the video description', () => {
    const wrapper = shallow(
      <SearchResult result={searchResult} />
    );

    expect(wrapper.findWhere(
      node => node.text() === searchResult.snippet.description
    ).exists()).toBe(true);
  });

  it('displays the video duration', () => {
    const wrapper = shallow(
      <SearchResult result={searchResult} />
    );

    expect(wrapper.findWhere(
      node => node.text() === searchResult.contentDetails.duration
    ).exists()).toBe(true);
  });

  it('responds with the video object when clicked', () => {
    const onClickMock = jest.fn();
    const wrapper = shallow(
      <SearchResult
        result={searchResult}
        onClick={onClickMock}
      />
    );

    wrapper.simulate('click');
    expect(onClickMock).toBeCalledWith(searchResult);
  });
});
