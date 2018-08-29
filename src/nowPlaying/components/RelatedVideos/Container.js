import React from 'react';
import { connectModule } from 'redux-modules';

import List from '../../../components/List';
import nowPlayingModule from '../../module';

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
      onListItemClick={setCurrentVideo}
    />
  );
}

export default connectModule(nowPlayingModule)(RelatedVideosContainer);
