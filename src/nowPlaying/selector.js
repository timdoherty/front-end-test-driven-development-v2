import { createSelector, createStructuredSelector } from 'reselect';

import { combineSearchData } from '../utils';

function base(state) {
  return state.nowPlaying;
}

const currentVideoSelector = createSelector(
  base,
  base => base.currentVideo
);

const commentsSelector = createSelector(
  base,
  base => base.comments ? base.comments.items : []
);

const rawRelatedVideosSelector = createSelector(
  base,
  base => base.relatedVideos ? base.relatedVideos.items : []
);

const relatedVideoMetadataSelector = createSelector(
  base,
  base => base.relatedVideoMetadata ? base.relatedVideoMetadata.items : []
);

const relatedVideosSelector = createSelector(
  rawRelatedVideosSelector,
  relatedVideoMetadataSelector,
  (relatedVideos, metadata) => combineSearchData(
    relatedVideos, metadata
  )
);

export default createStructuredSelector({
  comments: commentsSelector,
  currentVideo: currentVideoSelector,
  relatedVideos: relatedVideosSelector
});
