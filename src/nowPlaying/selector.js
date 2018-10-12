import { createSelector, createStructuredSelector } from 'reselect';

import { combineSearchData } from '../utils';

const baseSelector = state => state.nowPlaying;

const currentVideoResponseSelector = state =>
  baseSelector(state).currentVideo || {};

const currentVideoItemsSelector = state =>
  currentVideoResponseSelector(state).items || [];

const currentVideoSelector = createSelector(
  currentVideoItemsSelector,
  items => (items.length ? items[0] : null)
);

const commentsSelector = createSelector(
  baseSelector,
  base => (base.comments ? base.comments.items : [])
);

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
