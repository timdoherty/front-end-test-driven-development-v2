import React from 'react';
import { connectModule } from 'redux-modules';

import List from './List';
import searchModule from '../../module';

export function SearchResultListContainer(props) {
  const {
    searchResults,
    actions: {
      nowPlaying: {
        setCurrentVideo
      }
    }
  } = props;

  return (
    <List
      searchResults={searchResults}
      onListItemClicked={setCurrentVideo}
    />
  );
}

export default connectModule(searchModule)(SearchResultListContainer);
