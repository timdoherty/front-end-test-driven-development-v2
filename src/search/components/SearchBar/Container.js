import React from 'react';
import PropTypes from 'prop-types';
import { connectModule } from 'redux-modules';

import searchModule from '../../module';
import SearchBar from './SearchBar';

function SearchBarContainer(props) {
  const { actions: { setSearchTerm }, ...rest } = props;
  return (
    <SearchBar
      onSearchChanged={setSearchTerm}
      {...rest}
    />
  );
}

SearchBarContainer.propTypes = {
  actions: PropTypes.shape({
    setSearchTerm: PropTypes.func.isRequired
  })
};

export default connectModule(searchModule)(SearchBarContainer);
