import {
  loop,
  Cmd,
  getModel,
  getCmd,
} from 'redux-loop';
import axios from 'axios';

import nowPlayingModule from './module';
import { KEY } from '../constants';
import relatedVideosStubs from './stubs/relatedVideosStub';

const { actions, reducer } = nowPlayingModule;

describe('nowPlayingModule', () => {
  const searchResult = { id: 'foobar' };

  describe('current video', () => {
    it('gets the current video', () => {
      const id = 'foo';
      const url = `https://www.googleapis.com/youtube/v3/videos?part=statistics,contentDetails&id=${id}&key=${KEY}`;
      const expected = loop(
        { isLoading: true },
        Cmd.list([
          Cmd.run(
            axios.get,
            {
              args: [url],
              successActionCreator: actions.setCurrentVideo,
              failActionCreator: actions.onCurrentVideoFailure
            }
          ),
          Cmd.action(actions.getComments(id)),
          Cmd.action(actions.getRelatedVideos(id))
        ])
      );

      const actual = reducer({ isLoading: false }, actions.getCurrentVideo(id));
      expect(getModel(actual)).toEqual(getModel(expected));
      expect(getCmd(actual)).toEqual(getCmd(expected));
    });

    it('sets the current video', () => {
      const expected = {
        currentVideo: searchResult
      };

      const actual = reducer({}, actions.setCurrentVideo({ data: searchResult }));
      expect(getModel(actual)).toEqual(expected);
    });

    it('clears the current video', () => {
      const expected = {
        currentVideo: null,
        comments: null,
        relatedVideos: null
      };

      const actual = reducer({ currentVideo: 'foo' }, actions.clearCurrentVideo());
      expect(getModel(actual)).toEqual(expected);
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

      const actual = reducer(state, actions.setComments({ data: comments }));
      expect(getModel(actual)).toEqual(expected)
    });

    it('handles get comments failure', () => {
      const error = { message: 'foo' };
      const expected = { isLoading: false, error };

      const actual = reducer({ isLoading: true }, actions.onCommentsFailure(error))
      expect(getModel(actual)).toEqual(expected);
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
      const expected = loop(
        {
          isLoading: false,
          relatedVideos
        },
        Cmd.action(actions.getRelatedVideoMetadata())
      );

      const actual = reducer({ isLoading: true }, actions.onRelatedVideosSuccess({ data: relatedVideos }));
      expect(getModel(actual)).toEqual(getModel(expected));
      expect(getCmd(actual)).toEqual(getCmd(expected));
    });

    it('handles related videos failure', () => {
      const error = { foo: 'bar' };
      const expected = {
        isLoading: false,
        error
      };

      const actual = reducer({ isLoading: true }, actions.onRelatedVideosFailure(error));
      expect(getModel(actual)).toEqual(expected);
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
            successActionCreator: actions.onRelatedVideosSuccess,
            failActionCreator: actions.onRelatedVideosFailure
          }
        )
      );

      const actual = reducer({}, actions.getRelatedVideos(videoId));
      expect(getModel(actual)).toEqual(getModel(expected));
      expect(getCmd(actual)).toEqual(getCmd(expected));
    });

    describe('related videos metadata', () => {
      it('sets related videos metadata', () => {
        const metadata = {
          foo: 'barbaz',
          bim: 'fizzbuzz'
        };

        const expected = {
          isLoading: false,
          relatedVideoMetadata: metadata
        };

        const actual = reducer({ isLoading: true}, actions.setRelatedVideoMetadata({ data: metadata }));
        expect(getModel(actual)).toEqual(expected);
      });

      it('handles related videos metadata failure', () => {
        const error = { foo: 'bar' };
        const expected = {
          isLoading: false,
          error
        };

        const actual =  reducer({ isLoading: true }, actions.onRelatedVideosMetadataFailure(error));
        expect(getModel(actual)).toEqual(expected);
      });

      it('gets related video metadata', () => {
        const relatedVideoIds = relatedVideosStubs.items.map(item => item.id.videoId);
        const url = `https://www.googleapis.com/youtube/v3/videos?part=statistics,contentDetails&id=${relatedVideoIds.join(',')}&key=${KEY}`;
        const expected = loop(
          {
            isLoading: true,
            relatedVideos: relatedVideosStubs
          },
          Cmd.run(
            axios.get,
            {
              args: [url],
              successActionCreator: actions.setRelatedVideoMetadata,
              failActionCreator: actions.onRelatedVideoMetadataFailure
            }
          )
        );

        const actual = reducer({ isLoading: false, relatedVideos: relatedVideosStubs }, actions.getRelatedVideoMetadata());
        expect(actual).toEqual(expected);
      });
    });
  });

});
