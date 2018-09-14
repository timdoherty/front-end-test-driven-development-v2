import React from 'react';
import PropTypes from 'prop-types';

import SearchResult from '../SearchResult/SearchResult';

function List(props) {
  const { searchResults, onListItemClicked } = props;
  return (
    <div>
      {searchResults.map(result => (
        <SearchResult 
          key={result.etag}
          result={result}
          onClick={onListItemClicked}
        />
      ))}
    </div>
  );
}

List.propTypes = {
  searchResults: PropTypes.array,
  onListItemClicked: PropTypes.func
};

List.defaultProps = {
  searchResults: [],
  onListItemClicked: Function.prototype
}

export default List;
