import nowPlayingSelector from './selector';
import commentStubs from './stubs/commentsStub';
import relatedVideoStubs from './stubs/relatedVideosStub';

describe('nowPlayingSelector', () => {
  beforeEach(() => {

  });

  afterEach(() => {

  });

  const currentVideo =   {
   "kind": "youtube#searchResult",
   "etag": "\"XI7nbFXulYBIpL0ayR_gDh3eu1k/Va5WaCfLWg9_P0lB4Olj9aRA5ZI\"",
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
   "kind": "youtube#video",
   "etag": "\"XI7nbFXulYBIpL0ayR_gDh3eu1k/RRBaiYaP7zQ0RWQ4WuRnxO5qR7w\"",
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

  const state = {
    nowPlaying: {
      currentVideo,
      comments: commentStubs,
      relatedVideos: relatedVideoStubs
    }
  };

  describe('current video', () => {
    it('selects current video metadata', () => {
      const expected = currentVideo;
      const actual = nowPlayingSelector(state).currentVideo;
      expect(actual).toEqual(expected);
    })
  });

  describe('comments', () => {
    it('selects comments for the current video', () => {
      const expected = commentStubs.items;
      const actual = nowPlayingSelector(state).comments;
      expect(actual).toEqual(expected);
    });
  });

  describe('related videos', () => {
    it('gets videos related to the current video', () => {
      const expected = relatedVideoStubs.items;
      const actual = nowPlayingSelector(state).relatedVideos;
      expect(actual).toEqual(expected);
    });
  });
});
