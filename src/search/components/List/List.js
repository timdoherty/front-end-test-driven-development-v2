import React from 'react';
import PropTypes from 'prop-types';

import Preview from '../../../components/Preview';

function List(props) {
  const { searchResults, onListItemClicked } = props;
  return (
    <div>
      {searchResults.map(result => (
        <Preview 
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
