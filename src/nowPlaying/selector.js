import { createSelector, createStructuredSelector } from 'reselect';

import { combineSearchData, formatDuration } from '../utils';

const baseSelector = state => state.nowPlaying;

const currentVideoResponseSelector = state =>
  baseSelector(state).currentVideo || {};

const currentVideoItemsSelector = state =>
  currentVideoResponseSelector(state).items || [];

const currentVideoSelector = createSelector(
  currentVideoItemsSelector,
  items => {
    if (!items.length) {
      return null;
    }
    const item = items[0];
    return {
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
  }
);

const commentsSelector = createSelector(baseSelector, base => {
  const comments = base.comments ? base.comments.items : [];
  return comments.map(comment => ({
    id: comment.id,
    authorDisplayName:
      comment.snippet.topLevelComment.snippet.authorDisplayName,
    authorProfileImageUrl:
      comment.snippet.topLevelComment.snippet.authorProfileImageUrl,
    textDisplay: comment.snippet.topLevelComment.snippet.textDisplay,
    likeCount: comment.snippet.topLevelComment.snippet.likeCount,
    dislikeCount: comment.snippet.topLevelComment.snippet.dislikeCount,
  }));
});

const rawRelatedVideosSelector = createSelector(
  baseSelector,
  base => (base.relatedVideos ? base.relatedVideos.items : [])
);

const relatedVideoMetadataSelector = createSelector(
  baseSelector,
  base => (base.relatedVideoMetadata ? base.relatedVideoMetadata.items : [])
);

const relatedVideosSelector = createSelector(
  rawRelatedVideosSelector,
  relatedVideoMetadataSelector,
  (relatedVideos, metadata) => combineSearchData(relatedVideos, metadata)
);

export default createStructuredSelector({
  comments: commentsSelector,
  currentVideo: currentVideoSelector,
  relatedVideos: relatedVideosSelector,
});
