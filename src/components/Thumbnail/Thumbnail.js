import React from 'react';
import { Card } from '@procore/core-react';

import './Thumbnail.css';

export default function Thumbnail(props) {
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
