import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { compose } from 'ramda';

import searchModule from '../../module';
import SearchBar from './SearchBar';

function SearchBarContainer(props) {
  const {
    actions: { doSearch },
    history,
    ...rest
  } = props;

  function doSearchWithHistory(searchTerm) {
    doSearch(searchTerm);
    history.push(`/search/${searchTerm}`);
  }

  return <SearchBar onSearchChanged={doSearchWithHistory} {...rest} />;
}

SearchBarContainer.propTypes = {
  actions: PropTypes.shape({
    doSearch: PropTypes.func.isRequired,
  }),
};

const { actions } = searchModule;

function mapStateToProps(state) {
  return {
    searchTerm: state.search.searchTerm,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      doSearch(searchTerm) {
        return dispatch(actions.doSearch(searchTerm));
      },
    },
  };
}
export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(SearchBarContainer);
