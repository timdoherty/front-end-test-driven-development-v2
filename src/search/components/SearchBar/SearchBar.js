import React from 'react';
import PropTypes from 'prop-types';

import { Input } from '@procore/core-react';

function SearchBar(props) {
  const { onSearchChanged, searchTerm } = props;
  return (
    <Input
      value={searchTerm}
      onChange={() => {}}
      onKeyUp={({ key, target: { value } }) => {
        if (key === 'Enter' && !!value) {
          onSearchChanged(value);
        }
      }}
    />
  );
}

SearchBar.propTypes = {
  onSearchChanged: PropTypes.func,
  searchTerm: PropTypes.string,
};

SearchBar.defaultProps = {
  onSearchChanged: Function.prototype,
  searchTerm: '',
};

export default SearchBar;
