import { createSelector, createStructuredSelector } from 'reselect';

import { formatDuration } from '../utils';

function base(state) {
  return state.nowPlaying;
}

const currentVideoSelector = createSelector(
  base,
  base => base.currentVideo
);

const commentsSelector = createSelector(
  base,
  base => base.comments.items
);

const rawRelatedVideosSelector = createSelector(
  base,
  base => base.relatedVideos.items
);

const relatedVideoMetadataSelector = createSelector(
  base,
  base => base.relatedVideoMetadata.items
);

const relatedVideosSelector = createSelector(
  rawRelatedVideosSelector,
  relatedVideoMetadataSelector,
  (relatedVideos, metadata) => relatedVideos.map(video => {
    const meta = metadata.find(
      metadatum => metadatum.id === video.id.videoId
    );
    return {
      ...video,
      ...meta,
      id: meta ? meta.id : video.id.videoId,
      contentDetails: {
        duration: meta ? formatDuration(meta.contentDetails.duration) : ''
      }
    };
  })
)

export default createStructuredSelector({
  comments: commentsSelector,
  currentVideo: currentVideoSelector,
  relatedVideos: relatedVideosSelector
});
