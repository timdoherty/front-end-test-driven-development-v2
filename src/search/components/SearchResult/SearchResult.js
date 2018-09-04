import React from 'react';

import Thumbnail from '../../../components/Thumbnail';

export default function SearchResult(props) {
  const { result, onClick } = props;
  const {
    snippet: {
      title,
      description,
      channelTitle,
      thumbnails: {
        default: thumbnail
      }
    },
    contentDetails: {
      duration
    },
    id
  } = result;

  return (
    <div onClick={() => onClick(result)}>
      <Thumbnail
        imageUrl={thumbnail.url}
        height={thumbnail.height}
        width={thumbnail.width}
      />
      <span>{title}</span>
      <span>{description}</span>
      <span>{duration}</span>
    </div>
  );
}
