import { combineSearchData } from './index';
import searchResultsStubs from '../search/stubs/searchResultsStub';
import searchMetadataStubs from '../search/stubs/searchMetadataStub';

const coalescedResult = {
  "kind": "youtube#video",
  "etag": "\"XI7nbFXulYBIpL0ayR_gDh3eu1k/RRBaiYaP7zQ0RWQ4WuRnxO5qR7w\"",
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
    "duration": "00:58:54",
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

describe('utils', () => {
  it('combines search results and metadata', () => {
    const actual = combineSearchData([searchResultsStubs.items[0]], [searchMetadataStubs.items[0]]);
    expect(actual).toEqual([coalescedResult]);
  })
});
