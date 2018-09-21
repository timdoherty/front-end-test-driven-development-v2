import React from 'react';
import PropTypes from 'prop-types';

import Thumbnail from '../Thumbnail';
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
    statistics: {
      viewCount
    }
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
      </div>
      <div className="meta">
        <div className="title">{title}</div>
        <div className="stats" style={{ display: 'flex' }}>
          <span>{channelTitle}</span>
          <span>{`${viewCount} views`}</span>
        </div>
        <div className="description">{!hideDescription && description}</div>
      </div>
    </div>
  );
}

const thumbnailProptype = PropTypes.shape({
  url: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number
});

export const previewPropType = PropTypes.shape({
  snippet: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    channelTitle: PropTypes.string,
    thumbnails: PropTypes.shape({
      default: thumbnailProptype,
      medium: thumbnailProptype,
      high: thumbnailProptype
    })
  }),
  statistics: PropTypes.shape({
    viewCount: PropTypes.string
  })
});

Preview.propTypes = {
  result: previewPropType.isRequired,
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

