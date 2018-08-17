import React from 'react';

export default function Thumbnail(props) {
  const { imageUrl } = props;
  return (
    <img src={imageUrl} />
  );
}
