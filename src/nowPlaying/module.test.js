import {
  loop,
  Cmd,
  getModel,
  getCmd,
} from 'redux-loop';
import axios from 'axios';

import nowPlayingModule from './module';
import { KEY } from '../constants';

const { actions, reducer } = nowPlayingModule;

describe('nowPlayingModule', () => {
  beforeEach(() => {

  });

  afterEach(() => {

  });

  const searchResult =   {
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

  describe('current video', () => {
    it('sets the current video', () => {
      const expected = {
        currentVideo: searchResult
      };
      const actual = reducer({}, actions.setCurrentVideo(searchResult));
      expect(actual).toEqual(expected);
    });

    it('clears the current video', () => {
      const expected = {
        currentVideo: null,
        comments: null,
        relatedVideos: null
      };

      const actual = reducer({ currentVideo: 'foo' }, actions.clearCurrentVideo());
      expect(actual).toEqual(expected);
    });
  });

  describe('comments', () => {
    it('sets comments for the current video', () => {
      const state = {
        isLoading: true
      };
      const comments = { someCommentsAndStuff: {} };
      const expected = {
        isLoading: false,
        comments
      };

      const actual = reducer(state, actions.setComments(comments));
      expect(actual).toEqual(expected)
    });

    it('handles get comments failure', () => {
      const error = { message: 'foo' };
      const expected = { isLoading: false, error };

      const actual = reducer({ isLoading: true }, actions.onCommentsFailure)
    });

    it('gets comments for the current video', () => {
      const state = { isLoading: false };
      const videoId = 'foobarbaz';
      const url = `https://www.googleapis.com/youtube/v3/commentThreads?videoId=${videoId}&part=snippet&key=${KEY}`;
      const expected = loop(
        { isLoading: true },
        Cmd.run(
          axios.get,
          {
            args: [url],
            successActionCreator: actions.setComments,
            failActionCreator: actions.onCommentsFailure 
          }
        )
      );

      const actual = reducer(state, actions.getComments(videoId));
      expect(getModel(actual)).toEqual(getModel(expected));
      expect(getCmd(actual)).toEqual(getCmd(expected));
    });
  });

  describe('related videos', () => {
    it('sets related videos', () => {
      const relatedVideos = {
        foo: 'bar',
        baz: []
      };
      const expected = {
        isLoading: false,
        relatedVideos
      };

      const actual = reducer({ isLoading: true }, actions.setRelatedVideos(relatedVideos));
      expect(actual).toEqual(expected);
    });
  });

  it('handles related videos failure', () => {
    const error = { foo: 'bar' };
    const expected = {
      isLoading: false,
      error
    };

    const actual = reducer({ isLoading: true }, actions.onRelatedVideosFailure(error));
    expect(actual).toEqual(expected);
  });

  it('gets related videos', () => {
    const videoId = 'barbazbim';
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&relatedToVideoId=${videoId}&maxResults=20&key=${KEY}`;
    const expected = loop(
      { isLoading: true },
      Cmd.run(
        axios.get,
        {
          args: [url],
          successActionCreator: actions.setRelatedVideos,
          failActionCreator: actions.onRelatedVideosFailure
        }
      )
    );

    const actual = reducer({}, actions.getRelatedVideos(videoId));
    expect(getModel(actual)).toEqual(getModel(expected));
    expect(getCmd(actual)).toEqual(getCmd(expected));
  });
});
