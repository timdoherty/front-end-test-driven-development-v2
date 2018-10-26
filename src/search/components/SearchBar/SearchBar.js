import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import { Input, Button, Icon } from '@procore/core-react';

class SearchBar extends Component {
  static get propTypes() {
    return {
      onSearchChanged: PropTypes.func,
      searchTerm: PropTypes.string,
    };
  }

  static get defaultProps() {
    return {
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

export const SearchBarWithRouter = withRouter(SearchBar);
