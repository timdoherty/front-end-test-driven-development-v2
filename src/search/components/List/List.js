import React from 'react';

import Preview from '../../../components/Preview';

export default function List(props) {
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
