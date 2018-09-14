import React from 'react';
import PropTypes from 'prop-types';
import { connectModule } from 'redux-modules';

import List from './List';
import searchModule from '../../module';
import nowPlayingModule from '../../../nowPlaying/module';

function SearchResultListContainer(props) {
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

SearchResultListContainer.propTypes = {
  search: PropTypes.shape({
    searchResults: PropTypes.array.isRequired,
  }),
  actions: PropTypes.shape({
    nowPlaying: PropTypes.shape({
      setCurrentVideo: PropTypes.func.isRequired
    })
  }).isRequired
};

export default connectModule([searchModule, nowPlayingModule])(SearchResultListContainer);
