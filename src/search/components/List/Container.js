import React from 'react';
import PropTypes from 'prop-types';
import { connectModule } from 'redux-modules';

import List, { previewPropType } from '../../../components/List';
import searchModule from '../../module';

function SearchResultListContainer(props) {
  const { searchResults } = props;

  return (
    <List listItems={searchResults} />
  );
}

SearchResultListContainer.propTypes = {
  searchResults: PropTypes.arrayOf(previewPropType),
};

export default connectModule(searchModule)(SearchResultListContainer);
