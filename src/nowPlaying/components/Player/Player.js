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
      <div className="title-container">
        <span className="title">{title}</span>
        <span>{`${viewCount} views`}</span>
        <div>
          <span>{likeCount}</span>
          <span>{dislikeCount}</span>
        </div>
      </div>
      <span>{description}</span>
      <span>{channelTitle}</span>
      <span>{`${commentCount} comments`}</span>
    </section>
  );
}
