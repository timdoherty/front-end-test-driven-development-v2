import React from 'react';
import { connectModule } from 'redux-modules';

import List from '../../../components/List';
import searchModule from '../../module';
import nowPlayingModule from '../../../nowPlaying/module';
import './searchResults.css';

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
      className="search-results"
      listItems={searchResults}
      onListItemClicked={setCurrentVideo}
    />
  );
}
export default connectModule([searchModule, nowPlayingModule])(SearchResultListContainer);
