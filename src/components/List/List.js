import React from 'react';

import Preview from '../Preview';

export default function List(props) {
  const { listItems, onListItemClicked } = props;
  return (
    <div>
      {listItems.map(result => (
        <Preview 
          key={result.etag}
          result={result}
          onClick={onListItemClicked}
        />
      ))}
    </div>
  );
}
