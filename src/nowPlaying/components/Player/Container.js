import React from 'react';
import { connectModule } from 'redux-modules';

import nowPlayingModule from '../../module';
import Player from './Player';

export function PlayerContainer(props) {
  const { currentVideo } = props;
  return (
    <Player video={currentVideo} />
  );
}

export default connectModule(nowPlayingModule)(PlayerContainer);
