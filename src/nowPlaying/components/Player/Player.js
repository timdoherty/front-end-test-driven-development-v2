import React from 'react';

export default function Player(props) {
  const {
    video: {
      id,
      snippet: {
        title,
        description,
        channelTitle
      },
      statistics: {
        viewCount,
        likeCount,
        dislikeCount,
        favoriteCount,
        commentCount
      }
    }
  } = props;

  return (
    <section>
      <iframe src={`http://www.youtube.com/embed/${id}`} />
      <span>{title}</span>
      <span>{description}</span>
      <span>{channelTitle}</span>
      <span>{`${viewCount} views`}</span>
      <span>{likeCount}</span>
      <span>{dislikeCount}</span>
      <span>{`${commentCount} comments`}</span>
    </section>
  );
}
