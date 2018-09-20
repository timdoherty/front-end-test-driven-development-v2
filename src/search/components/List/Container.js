import React from 'react';
import PropTypes from 'prop-types';
import { connectModule } from 'redux-modules';

import List from './List';
import searchModule from '../../module';

function SearchResultListContainer(props) {
  const { searchResults } = props;

  return (
    <List
      searchResults={searchResults}
      onListItemClicked={Function.prototype}
    />
  );
}

SearchResultListContainer.propTypes = {
  searchResults: PropTypes.array.isRequired,
  actions: PropTypes.shape({
    nowPlaying: PropTypes.shape({
      setCurrentVideo: PropTypes.func.isRequired
    })
  }).isRequired
};

export default connectModule(searchModule)(SearchResultListContainer);
