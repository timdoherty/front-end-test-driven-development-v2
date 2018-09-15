import React from 'react';
import PropTypes from 'prop-types';

import Preview, { previewPropType } from '../Preview';

function List(props) {
  const {
    listItems,
    onListItemClicked,
    thumbnailSize,
    hideDescription
  } = props;

  return (
    <div>
      {listItems.map(result => (
        <Preview 
          key={result.etag}
          result={result}
          onClick={onListItemClicked}
          thumbnailSize={thumbnailSize}
          hideDescription={hideDescription}
        />
      ))}
    </div>
  );
}

List.propTypes = {
  listItems: PropTypes.arrayOf(previewPropType),
  onListItemClicked: PropTypes.func,
  thumbnailSize: PropTypes.string,
  hideDescription: PropTypes.bool
};

export default List;
