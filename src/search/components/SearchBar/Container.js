import React from 'react';
import PropTypes from 'prop-types';
import { connectModule } from 'redux-modules';
import { withRouter } from 'react-router';
import { compose } from 'ramda';

import searchModule from '../../module';
import SearchBar from './SearchBar';

function SearchBarContainer(props) {
  const { actions: { doSearch }, history, ...rest } = props;
  function doSearchWithRouteChange(searchTerm) {
    doSearch(searchTerm);
    history.push(`/search/${searchTerm}`);
  }
  return (
    <SearchBar
      onSearchChanged={doSearchWithRouteChange}
      {...rest}
    />
  );
}

SearchBarContainer.propTypes = {
  actions: PropTypes.shape({
    doSearch: PropTypes.func.isRequired
  })
};

export default compose(
  withRouter,
  connectModule(searchModule)
)(SearchBarContainer);
