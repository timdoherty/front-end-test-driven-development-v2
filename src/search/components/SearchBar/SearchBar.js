import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Input, Button, Icon } from '@procore/core-react';

export default class SearchBar extends Component {
  static get propTypes() {
    return {
      onSearchChanged: PropTypes.func
    }
  }

  static get defaultProps() {
    return {
      oSearchChanged: Function.protptype
    }
  }

  constructor() {
    super();
    this.state = {
      searchTerm: ''
    };
  }

  onSearch = () => {
    if (!!this.state.searchTerm) {
      this.props.onSearchChanged(this.state.searchTerm);
    }
  }

  render () {
    return (
      <div style={{ display: 'flex' }}>
        <Input
          value={this.state.searchTerm}
          onChange={({ target: { value } }) => {
            this.setState({ searchTerm: value });
          }}
          onKeyUp={({ key }) => {
            if (key === 'Enter') {
              this.onSearch();
            }
          }}
        />
        <Button
          style={{ backgroundColor: '#eee' }}
          variant="secondary"
          onClick={this.onSearch}
        >
          <Icon icon="search" />
        </Button>
      </div>
    );
  }
}
