import { createModule } from 'redux-modules';
import { loop, Cmd } from 'redux-loop';
import axios from 'axios';

import nowPlayingSelector from './selector';

import { KEY } from '../constants';

const nowPlayingModule = createModule({
  name: 'nowPlaying',
  initialState: {},
  selector: nowPlayingSelector,
  transformations: {
    clearCurrentVideo(state, action) {
      return {
        ...state,
        currentVideo: null,
        comments: null,
        relatedVideos: null
      };
    },
    getComments(state, action) {
      const { payload: id } = action;
      const url = `https://www.googleapis.com/youtube/v3/commentThreads?videoId=${id}&part=snippet&key=${KEY}`;
      return loop(
        {
          ...state,
          isLoading: true
        },
        Cmd.run(
          axios.get,
          {
            args: [url],
            successActionCreator: nowPlayingModule.actions.setComments,
            failActionCreator: nowPlayingModule.actions.onCommentsFailure
          }
        )
      )
    },
    getRelatedVideos(state, action) {
      const { payload: id } = action;
      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&relatedToVideoId=${id}&maxResults=20&key=${KEY}`;
      return loop(
        {
          ...state,
          isLoading: true
        },
        Cmd.run(
          axios.get,
          {
            args: [url],
            successActionCreator: nowPlayingModule.actions.setRelatedVideos,
            failActionCreator: nowPlayingModule.actions.onRelatedVideosFailure
          }
        )
      )
    },
    getRelatedVideoMetadata(state, action) {
      const { payload: { data: relatedVideoIds } } = action;
      const url = `https://www.googleapis.com/youtube/v3/videos?part=statistics,contentDetails&id=${relatedVideoIds.join(',')}&key=${KEY}`;
      return loop(
        { isLoading: true },
        Cmd.run(
          axios.get,
          {
            args: [url],
            successActionCreator: nowPlayingModule.actions.setRelatedVideoMetadata,
            failActionCreator: nowPlayingModule.actions.onRelatedVideoMetadataFailure
          }
        )
      );
    },
    onCommentsFailure(state, action) {
      const { payload: error } = action;
      return {
        ...state,
        error
      };
    },
    onRelatedVideosFailure(state, action) {
      const { payload: error } = action;
      return {
        ...state,
        isLoading: false,
        error
      };
    },
    onRelatedVideosMetadataFailure(state, action) {
      const { payload: error } = action;
      return {
        ...state,
        isLoading: false,
        error
      };
    },
    setCurrentVideo(state, action) {
      const { payload: currentVideo } = action;
      return {
        ...state,
        currentVideo
      }
    },
    setComments(state, action) {
      const { payload: { data: comments } } = action;
      return {
        ...state,
        isLoading: false,
        comments
      };
    },
    setRelatedVideos(state, action) {
      const { payload: { data: relatedVideos } } = action;
      return {
        ...state,
        isLoading: false,
        relatedVideos
      };
    },
    setRelatedVideoMetadata(state, action) {
      const { payload: { data: relatedVideoMetadata } } = action;
      return {
        ...state,
        isLoading: false,
        relatedVideoMetadata
      };
    }
  }
});

export default nowPlayingModule;
