import React from 'react';
import PropTypes from 'prop-types';
import { connectModule } from 'redux-modules';

import List from '../../../components/List';
import searchModule from '../../module';

function SearchResultListContainer(props) {
  const { searchResults } = props;

  return (
    <List listItems={searchResults} />
  );
}

SearchResultListContainer.propTypes = {
  searchResults: PropTypes.array.isRequired,
};

export default connectModule(searchModule)(SearchResultListContainer);
