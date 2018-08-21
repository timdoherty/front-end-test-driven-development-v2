import React from 'react';
import { connectModule } from 'redux-modules';

import List from './List';
import searchModule from '../../module';

export function ListContainer(props) {
  const {
    searchResults,
    actions: {
      setNowPlaying
    }
  } = props;

  return (
    <List
      searchResults={searchResults}
      onListItemClicked={setNowPlaying}
    />
  );
}


export default connectModule(searchModule)(ListContainer);
