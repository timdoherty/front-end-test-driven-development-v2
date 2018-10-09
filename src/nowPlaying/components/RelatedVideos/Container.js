import React from 'react';
import PropTypes from 'prop-types';
import { connectModule } from 'redux-modules';

import List from '../../../components/List';
import nowPlayingModule from '../../module';

function RelatedVideosContainer(props) {
  const { relatedVideos } = props;

  return (
    <List
      listItems={relatedVideos}
    />
  );
}

RelatedVideosContainer.propTypes = {
  relatedVideos: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default connectModule(nowPlayingModule)(RelatedVideosContainer);
