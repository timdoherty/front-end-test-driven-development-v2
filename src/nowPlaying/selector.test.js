import nowPlayingSelector from './selector';
import commentStubs from './stubs/commentsStub';
import relatedVideoStubs from './stubs/relatedVideosStub';
import relatedVideoMetadataStubs from './stubs/relatedVideoMetadataStub';
import { combineSearchData } from '../utils';

describe('nowPlayingSelector', () => {
  const currentVideo =   { foo: 'bar' };

  const state = {
    nowPlaying: {
      currentVideo,
      comments: commentStubs,
      relatedVideos: relatedVideoStubs,
      relatedVideoMetadata: relatedVideoMetadataStubs
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
      const expected = combineSearchData(
        relatedVideoStubs.items, relatedVideoMetadataStubs.items
      );

      const actual = nowPlayingSelector(state).relatedVideos;
      expect(actual).toEqual(expected);
    });
  });
});
