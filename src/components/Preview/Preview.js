import React from 'react';
import PropTypes from 'prop-types';

import Thumbnail from '../Thumbnail';

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
    },
    id
  } = result;

  const thumbnail = thumbnails[thumbnailSize];

  return (
    <div onClick={() => onClick(result)}>
      <Thumbnail
        imageUrl={thumbnail.url}
        height={thumbnail.height}
        width={thumbnail.width}
      />
      <span>{title}</span>
      <span>{channelTitle}</span>
      <span>{`${viewCount} views`}</span>
      <span>{!hideDescription && description}</span>
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
  }),
  id: PropTypes.string
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
