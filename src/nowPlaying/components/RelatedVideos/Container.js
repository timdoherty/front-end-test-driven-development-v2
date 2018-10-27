import React from 'react';
import PropTypes from 'prop-types';
import { connectModule } from 'redux-modules';

import List from '../../../components/List';
import nowPlayingModule from '../../module';
import './RelatedVideos.css';

function RelatedVideosContainer(props) {
  const { relatedVideos } = props;

  return (
    <List
      className="related-videos"
      listItems={relatedVideos}
      hideDescription={true}
    />
  );
}

RelatedVideosContainer.propTypes = {
  relatedVideos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connectModule(nowPlayingModule)(RelatedVideosContainer);
