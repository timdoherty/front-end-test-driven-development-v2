import React from 'react';
import PropTypes from 'prop-types';
import { connectModule } from 'redux-modules';

import List, { previewPropType } from '../../../components/List';
import searchModule from '../../module';
import './searchResults.css';

function SearchResultListContainer(props) {
  const { searchResults } = props;

  return (
    <List
      className="search-results"
      listItems={searchResults}
      thumbnailSize="medium"
    />
  );
}

SearchResultListContainer.propTypes = {
  searchResults: PropTypes.arrayOf(previewPropType),
};

export default connectModule(searchModule)(SearchResultListContainer);
