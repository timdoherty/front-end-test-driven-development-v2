import React from 'react';
import { connectModule } from 'redux-modules';

import List from './List';
import searchModule from '../../module';
import nowPlayingModule from '../../../nowPlaying/module';

export function SearchResultListContainer(props) {
  const {
    search: {
      searchResults
    },
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
export default connectModule([searchModule, nowPlayingModule])(SearchResultListContainer);