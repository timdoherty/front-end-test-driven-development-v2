import nowPlayingSelector from './selector';
import commentStubs from './stubs/commentsStub';
import relatedVideoStubs from './stubs/relatedVideosStub';
import relatedVideoMetadataStubs from './stubs/relatedVideoMetadataStub';
import { combineSearchData, formatDuration } from '../utils';

describe('nowPlayingSelector', () => {
  const currentVideo = {
    items: [
      {
        id: 'foobarbaz',
        snippet: {
          title: 'Foo Bar Baz',
          description: 'This is the Foo Bar Baz video.',
          channelTitle: 'FooBarBaz channel',
        },
        statistics: {
          viewCount: '100000000',
          likeCount: '50000',
          dislikeCount: '3',
          favoriteCount: '1',
          commentCount: '333',
        },
        contentDetails: {
          duration: '00:05:32',
        },
      },
    ],
  };

  const state = {
    nowPlaying: {
      currentVideo,
      comments: commentStubs,
      relatedVideos: relatedVideoStubs,
      relatedVideoMetadata: relatedVideoMetadataStubs,
    },
  };

  describe('current video', () => {
    it('selects current video metadata', () => {
      const item = currentVideo.items[0];
      const expected = {
        channelTitle: item.snippet.channelTitle,
        commentCount: item.statistics.commentCount,
        description: item.snippet.description,
        dislikeCount: item.statistics.dislikeCount,
        duration: formatDuration(item.contentDetails.duration),
        id: item.id,
        likeCount: item.statistics.likeCount,
        title: item.snippet.title,
        viewCount: item.statistics.viewCount,
      };
      const actual = nowPlayingSelector(state).currentVideo;
      expect(actual).toEqual(expected);
    });
  });

  describe('comments', () => {
    it('selects comments for the current video', () => {
      let expected = commentStubs.items;
      let actual = nowPlayingSelector(state).comments;
      expect(actual.length).toBe(expected.length);

      expected = expected[0];
      actual = actual[0];
      expect(actual.authorDisplayName).toBe(
        expected.snippet.topLevelComment.snippet.authorDisplayName
      );
      expect(actual.authorProfileImageUrl).toBe(
        expected.snippet.topLevelComment.snippet.authorProfileImageUrl
      );
      expect(actual.textDisplay).toBe(
        expected.snippet.topLevelComment.snippet.textDisplay
      );
      expect(actual.likeCount).toBe(
        expected.snippet.topLevelComment.snippet.likeCount
      );
      expect(actual.dislikeCount).toBe(
        expected.snippet.topLevelComment.snippet.dislikeCount
      );
    });
  });

  describe('related videos', () => {
    it('gets videos related to the current video', () => {
      const expected = combineSearchData(
        relatedVideoStubs.items,
        relatedVideoMetadataStubs.items
      );

      const actual = nowPlayingSelector(state).relatedVideos;
      expect(actual).toEqual(expected);
    });
  });
});
