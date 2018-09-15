import React from 'react';
import PropTypes from 'prop-types';
import { connectModule } from 'redux-modules';

import List from '../../../components/List';
import nowPlayingModule from '../../module';
import { previewPropType } from '../../../components/Preview';

function RelatedVideosContainer(props) {
  const {
    relatedVideos,
    actions: {
      setCurrentVideo
    }
  } = props;

  return (
    <List
      listItems={relatedVideos}
      onListItemClicked={setCurrentVideo}
    />
  );
}

RelatedVideosContainer.propTypes = {
  relatedVideos: PropTypes.arrayOf(previewPropType).isRequired,
  actions: PropTypes.shape({
    setCurrentVideo: PropTypes.func.isRequired
  }).isRequired
};
export default connectModule(nowPlayingModule)(RelatedVideosContainer);
