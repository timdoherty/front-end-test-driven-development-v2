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
      style={{ display: 'flex', padding: '5px 5px 0 5px' }}
    >
      <div style={{ flex: `0 0 ${thumbnail.width}px`, height: `${thumbnail.height}px`, width: `${thumbnail.width}px`, position: 'relative' }}>
        <Thumbnail
          imageUrl={thumbnail.url}
          height={thumbnail.height}
          width={thumbnail.width}
        />
        <div
          style={{
            backgroundColor: 'black',
            color: 'white',
            position: 'absolute',
            bottom: 0,
            right: 0,
            fontSize: '0.7rem'
          }}
        >
          {duration}
        </div>
      </div>
      <div
        className="meta"
        style={{
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'left',
          paddingLeft: '5px'
        }}
      >
        <div className="title">{title}</div>
        <div className="stats" style={{ display: 'flex' }}>
          <span>{`${viewCount} views`}</span>
        </div>
        <div>{!hideDescription && description}</div>
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
  thumbnailSize: 'default'
};

export default Preview;
