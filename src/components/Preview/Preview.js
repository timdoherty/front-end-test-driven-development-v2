import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '@procore/core-react';
import { Link } from 'react-router-dom';

import './Preview.css';

function Preview(props) {
<<<<<<< HEAD
  const { channelTitle, description, id, thumbnail, title, viewCount } = props;

  return (
    <Link to={`/now-playing/${id}`}>
      <div className="preview-container">
        <Card
          style={{
            flex: `0 0 ${thumbnail.width}px`,
            height: `${thumbnail.height}px`,
            width: `${thumbnail.width}px`,
          }}
        >
          <img
            src={thumbnail.url}
            height={thumbnail.height}
            width={thumbnail.width}
          />
        </Card>
        <div className="meta">
          <div className="title">{title}</div>
          <div className="stats" style={{ display: 'flex' }}>
            <div>{channelTitle}</div>
            <div>{`${viewCount} views`}</div>
          </div>
          <div className="description">{description}</div>
        </div>
      </div>
=======
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
      <Card
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
        <span>{duration}</span>
      </Card>
      <span>{title}</span>
      <span>{channelTitle}</span>
      <span>{`${viewCount} views`}</span>
      <span>{description}</span>
>>>>>>> 789c882... update readme for step11; add duration to preview component
    </Link>
  );
}

Preview.propTypes = {
  channelTitle: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
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
  thumbnail: {
    url: '',
    height: 0,
    width: 0,
  },
  title: '',
  viewCount: '',
};

export default Preview;
