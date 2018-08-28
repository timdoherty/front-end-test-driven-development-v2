import React from 'react';
import { connectModule } from 'redux-modules';

import List from './List';
import searchModule from '../../module';

export function ListContainer(props) {
  const {
    searchResults,
    actions: {
      setCurrentVideo
    }
  } = props;

  return (
    <List
      searchResults={searchResults}
      onListItemClicked={setCurrentVideo}
    />
  );
}


export default connectModule(searchModule)(ListContainer);
