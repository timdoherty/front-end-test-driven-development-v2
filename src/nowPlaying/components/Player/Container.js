import React from 'react';
import PropTypes from 'prop-types';
import { connectModule } from 'redux-modules';

import nowPlayingModule from '../../module';
import Player, { videoPropType } from './Player';

function PlayerContainer(props) {
  const { currentVideo } = props;
  if (!currentVideo) {
    return null;
  }

  return (
    <Player video={currentVideo} />
  );
}

PlayerContainer.propTypes = {
  currentVideo: videoPropType
};

export default connectModule(nowPlayingModule)(PlayerContainer);
