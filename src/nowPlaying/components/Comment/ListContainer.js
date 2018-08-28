import React from 'react';
import { connectModule } from 'redux-modules';

import List from './List';
import nowPlayingModule from '../../module';

function ListContainer(props) {
  const { comments } = props;
  return (
    <List comments={comments} />
  );
}

export default connectModule(nowPlayingModule)(ListContainer)
