import React from 'react';
import PropTypes from 'prop-types';

import Thumbnail from '../Thumbnail/Thumbnail';
import './Preview.css';

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
      className="preview-container"
      onClick={() => onClick(result)}
    >
      <div
        className="thumbnail"
        style={{
          flex: `0 0 ${thumbnail.width}px`,
          height: `${thumbnail.height}px`,
          width: `${thumbnail.width}px`
        }}
      >
        <Thumbnail
          imageUrl={thumbnail.url}
          height={thumbnail.height}
          width={thumbnail.width}
        />
        <div className="duration">
          {duration}
        </div>
      </div>
      <div className="meta">
        <div className="title">{title}</div>
        <div className="stats" style={{ display: 'flex' }}>
          <span>{`${viewCount} views`}</span>
        </div>
        <div className="description">{!hideDescription && description}</div>
      </div>
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
  thumbnailSize: 'medium'
};

export default Preview;
