import React from 'react';
import { Card } from '@procore/core-react';

export default function Thumbnail(props) {
  const { imageUrl, height, width, duration } = props;
  return (
    <Card level="10" style={{ height: `${height}px`, width: `${width}px` }}>
      <img src={imageUrl} height={`${height}`} width={`${width}`} />
      <div>{duration}</div>
    </Card>
  );
}
