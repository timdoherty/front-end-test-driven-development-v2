import React from 'react';

import SearchResult from '../SearchResult/SearchResult';

export default function List(props) {
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
