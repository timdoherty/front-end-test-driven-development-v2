import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '@procore/core-react';

import './Thumbnail.css';

function Thumbnail(props) {
  const { imageUrl, height, width, duration } = props;
  return (
    <Card
      level="10"
      style={{
        height: `${height}px`,
        width: `${width}px`,
        position: 'relative'
      }}
    >
      <img
        src={imageUrl}
        height={`${height}`}
        width={`${width}`}
        alt="Youtube video preview"
        />
      <div className="duration">{duration}</div>
    </Card>
  );
}

Thumbnail.propTypes = {
  imageUrl: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
  duration: PropTypes.string
};

Thumbnail.defaultProps = {
  imageUrl: '',
  height: 0,
  width: 0,
  duration: ''
}

export default Thumbnail;
