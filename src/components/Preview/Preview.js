import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '@procore/core-react';
import { Link } from 'react-router-dom';

function Preview(props) {
  const {
    channelTitle,
    description,
    id,
    thumbnail,
    title,
    viewCount
  } = props;

  return (
    <Link to={`/now-playing/${id}`}>
      <Card style={{
        height: `${thumbnail.height}px`,
        width: `${thumbnail.width}px`
      }}>
        <img
          src={thumbnail.url}
          height={thumbnail.height}
          width={thumbnail.width}
        />
      </Card>
      <span>{title}</span>
      <span>{channelTitle}</span>
      <span>{`${viewCount} views`}</span>
      <span>{description}</span>
    </Link>
  );
}

Preview.propTypes = {
  channelTitle: PropTypes.string,
  description: PropTypes.oneOfType([
    PropTypes.string, PropTypes.bool
  ]),
  thumbnail: PropTypes.shape({
    url: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number
  }),
  title: PropTypes.string,
  viewCount: PropTypes.string
};

Preview.defaultProps = {
  channelTitle: '',
  description: '',
  thumbnail: {
    url: '',
    height: 0,
    width: 0
  },
  title: '',
  viewCount: ''
};

export default Preview;
