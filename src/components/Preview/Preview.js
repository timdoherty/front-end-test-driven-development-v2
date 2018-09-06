import React from 'react';
import PropTypes from 'prop-types';

import Thumbnail from '../Thumbnail/Thumbnail';

function Preview(props) {
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
    statistics: {
      viewCount
    },
    id
  } = result;

  const thumbnail = thumbnails[thumbnailSize];

  return (
    <div
      onClick={() => onClick(result)}
      style={{ display: 'flex', paddingBottom: '5px' }}
    >
      <div style={{ flex: `0 0 ${thumbnail.width}px`, height: `${thumbnail.height}px`, width: `${thumbnail.width}px`, position: 'relative' }}>
        <Thumbnail
          imageUrl={thumbnail.url}
          height={thumbnail.height}
          width={thumbnail.width}
        />
        <div style={{ backgroundColor: 'black', color: 'white', position: 'absolute', bottom: 0, right: 0 }}>
          {duration}
        </div>
      </div>
      <span>{title}</span>
      <span>{`${viewCount} views`}</span>
      <span>{!hideDescription && description}</span>
    </div>
  );
}

Preview.propTypes = {
  hideDescription: PropTypes.bool,
  thumbnailSize: PropTypes.oneOf([
    'default',
    'medium',
    'high'
  ])
};

Preview.defaultProps = {
  hideDescription: false,
  thumbnailSize: 'default'
};

export default Preview;
