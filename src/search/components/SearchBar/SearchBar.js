import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Input, Button, Icon } from '@procore/core-react';

export default class SearchBar extends Component {
  static get propTypes() {
    return {
      onSearchChanged: PropTypes.func,
    };
  }

  static get defaultProps() {
    return {
      onSearchChanged: Function.prototype,
    };
  }

  constructor() {
    super();
    this.state = { searchTerm: '' };
    this.onSearchTermChanged = this.onSearchTermChanged.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onSearchTermKeyUp = this.onSearchTermKeyUp.bind(this);
  }

  componentDidMount() {
    const { searchTerm } = this.props;
    if (!!searchTerm) {
      this.setState({ searchTerm });
    }
  }

  onSearch() {
    if (!!this.state.searchTerm) {
      this.props.onSearchChanged(this.state.searchTerm);
    }
  }

  onSearchTermChanged({ target: { value } }) {
    this.setState({ searchTerm: value });
  }

  onSearchTermKeyUp({ key }) {
    if (key === 'Enter') {
      this.onSearch();
    }
  }

  render() {
    const { onSearchChanged, searchTerm } = this.props;
    return (
      <div>
        <Input
          value={this.state.searchTerm}
          onChange={this.onSearchTermChanged}
          onKeyUp={this.onSearchTermKeyUp}
        />
        <Button variant="secondary" onClick={this.onSearch}>
          <Icon icon="search" />
        </Button>
      </div>
    );
  }
}
