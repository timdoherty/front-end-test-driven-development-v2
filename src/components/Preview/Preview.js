import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '@procore/core-react';
import { Link } from 'react-router-dom';

import './Preview.css';

function Preview(props) {
  const {
    channelTitle,
    description,
    duration,
    id,
    thumbnail,
    title,
    viewCount,
  } = props;

  return (
    <Link to={`/now-playing/${id}`}>
      <div className="preview-container">
        <Card
          className="thumbnail"
          style={{
            height: `${thumbnail.height}px`,
            width: `${thumbnail.width}px`,
          }}
        >
          <img
            src={thumbnail.url}
            height={thumbnail.height}
            width={thumbnail.width}
          />
          <div>{duration}</div>
        </Card>
        <div className="meta">
          <div className="title">{title}</div>
          <div className="stats" style={{ display: 'flex' }}>
            <span>{channelTitle}</span>
            <span>{`${viewCount} views`}</span>
          </div>
          <div className="description">{description}</div>
        </div>
      </div>
    </Link>
  );
}

Preview.propTypes = {
  channelTitle: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  duration: PropTypes.string,
  thumbnail: PropTypes.shape({
    url: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
  }),
  title: PropTypes.string,
  viewCount: PropTypes.string,
};

Preview.defaultProps = {
  channelTitle: '',
  description: '',
  duration: '',
  thumbnail: {
    url: '',
    height: 0,
    width: 0,
  },
  title: '',
  viewCount: '',
};

export default Preview;
