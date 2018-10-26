import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'ramda';
import { Input, Button } from '@procore/core-react';

import searchModule from '../../module';

const { actions } = searchModule;

export class SearchBar extends Component {
  static get propTypes() {
    return {
      history: PropTypes.shape({
        push: PropTypes.func,
      }),
      onSearchChanged: PropTypes.func,
      searchTerm: PropTypes.string,
    };
  }

  static get defaultProps() {
    return {
      history: { push() {} },
      onSearchChanged: Function.prototype,
      searchTerm: '',
    };
  }

  constructor(props) {
    super(props);

    this.doSearch = this.doSearch.bind(this);
    this.onSearchTermChanged = this.onSearchTermChanged.bind(this);
    this.onSearchTermKeyUp = this.onSearchTermKeyUp.bind(this);

    this.state = { searchTerm: props.searchTerm || '' };
  }

  doSearch() {
    if (!!this.state.searchTerm) {
      this.props.onSearchChanged(this.state.searchTerm);
      this.props.history.push(`/search/${this.state.searchTerm}`);
    }
  }

  onSearchTermChanged({ target: { value } }) {
    this.setState({ searchTerm: value });
  }

  onSearchTermKeyUp({ key }) {
    if (key === 'Enter') {
      this.doSearch();
    }
  }

  render() {
    return (
      <div>
        <Input
          value={this.state.searchTerm}
          onChange={this.onSearchTermChanged}
          onKeyUp={this.onSearchTermKeyUp}
        />
        <Button variant="secondary" onClick={this.doSearch} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    searchTerm: state.search.searchTerm,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSearchChanged(searchTerm) {
      return dispatch(actions.doSearch(searchTerm));
    },
  };
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter
)(SearchBar);
