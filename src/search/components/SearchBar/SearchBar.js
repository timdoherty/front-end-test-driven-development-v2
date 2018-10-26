import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Input, Button, Icon } from '@procore/core-react';

export default class SearchBar extends Component {
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

    this.onSearchTermChanged = this.onSearchTermChanged.bind(this);
    this.doSearch = this.doSearch.bind(this);
    this.onSearchTermKeyUp = this.onSearchTermKeyUp.bind(this);

    this.state = { searchTerm: props.searchTerm || '' };
  }

  componentDidMount() {
    const { searchTerm } = this.props;
    if (!!searchTerm) {
      this.setState({ searchTerm });
    }
  }

  doSearch() {
    if (!!this.state.searchTerm) {
      this.props.onSearchChanged(this.state.searchTerm);
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
    const { onSearchChanged, searchTerm } = this.props;

    return (
      <div>
        <Input
          value={this.state.searchTerm}
          onChange={this.onSearchTermChanged}
          onKeyUp={this.onSearchTermKeyUp}
        />
        <Button variant="secondary" onClick={this.doSearch}>
          <Icon icon="search" />
        </Button>
      </div>
    );
  }
}
