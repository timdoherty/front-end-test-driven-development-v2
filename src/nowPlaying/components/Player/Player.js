import React from 'react';

import './Player.css';

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
    <section className="player-container">
      <div className="video-container">
        <iframe
          src={`http://www.youtube.com/embed/${id}`}
          allowFullScreen
          width="720" height="405"
        />
      </div>
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
