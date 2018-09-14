import React from 'react';
import PropTypes from 'prop-types';
import { connectModule } from 'redux-modules';

import searchModule from '../../module';
import SearchBar from './SearchBar';

function SearchBarContainer(props) {
  const { actions: { doSearch }, ...rest } = props;
  return (
    <SearchBar
      onSearchChanged={doSearch}
      {...rest}
    />
  );
}

SearchBarContainer.propTypes = {
  actions: PropTypes.shape({
    doSearch: PropTypes.func.isRequired
  })
};

export default connectModule(searchModule)(SearchBarContainer);
