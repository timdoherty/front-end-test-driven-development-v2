import { createSelector, createStructuredSelector } from 'reselect';

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

const relatedVideosSelector = createSelector(
  base,
  base => base.relatedVideos.items
);

export default createStructuredSelector({
  comments: commentsSelector,
  currentVideo: currentVideoSelector,
  relatedVideos: relatedVideosSelector
});
