import React from 'react';
import PropTypes from 'prop-types';

import Thumbnail from '../Thumbnail/Thumbnail';

function SearchResult(props) {
  const {
    result,
    onClick,
    thumbnailSize,
    hideDescription
  } = props;

  const {
    snippet: {
      title,
      description,
      channelTitle,
      thumbnails
    },
    contentDetails: {
      duration
    },
    id
  } = result;

  const thumbnail = thumbnails[thumbnailSize];
  // TODO wrap text in spans and redo matcher tests
  return (
    <div onClick={() => onClick(result)}>
      <Thumbnail
        imageUrl={thumbnail.url}
        height={thumbnail.height}
        width={thumbnail.width}
      />
      {title}
      {!hideDescription && description}
      {duration}
    </div>
  );
}

SearchResult.propTypes = {
  hideDescription: PropTypes.bool,
  thumbnailSize: PropTypes.oneOf([
    'default',
    'medium',
    'high'
  ])
};

SearchResult.defaultProps = {
  hideDescription: false,
  thumbnailSize: 'default'
};

export default SearchResult;
