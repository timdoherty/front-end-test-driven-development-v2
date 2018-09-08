import React from 'react';
import { connectModule } from 'redux-modules';

import List from '../../../components/List';
import nowPlayingModule from '../../module';
import './RelatedVideos.css';

function RelatedVideosContainer(props) {
  const {
    relatedVideos,
    actions: {
      setCurrentVideo
    }
  } = props;

  return (
    <List
      className="related-videos"
      listItems={relatedVideos}
      onListItemClicked={setCurrentVideo}
      hideDescription={true}
    />
  );
}

export default connectModule(nowPlayingModule)(RelatedVideosContainer);
