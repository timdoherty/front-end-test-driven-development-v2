import React from 'react';
import PropTypes from 'prop-types';

import './Player.css';
import thumbsupicon from '../../../assets/thumbsup.png';
import thumbsdownicon from '../../../assets/thumbsdown.png';

function Player(props) {
  const {
    channelTitle,
    commentCount,
    description,
    dislikeCount,
    likeCount,
    id,
    title,
    viewCount,
  } = props;

  return (
    <section className="player-container">
      <div className="video-container">
        <iframe
          src={`http://www.youtube.com/embed/${id}`}
          allowFullScreen
          width="720"
          height="405"
        />
      </div>
      <div className="title-container">
        <span className="title">{title}</span>
        <div>
          <span className="view-count">{`${viewCount} views`}</span>
          <div className="likes">
            <img src={thumbsupicon} />
            <span>{likeCount}</span>
            <img src={thumbsdownicon} />
            <span>{dislikeCount}</span>
          </div>
        </div>
      </div>
      <div className="description">
        <span>{channelTitle}</span>
        <span>{description}</span>
      </div>
      <div className="comments">
        <span>{`${commentCount} comments`}</span>
      </div>
    </section>
  );
}

Player.propTypes = {
  channelTitle: PropTypes.string,
  commentCount: PropTypes.string,
  description: PropTypes.string,
  dislikeCount: PropTypes.string,
  likeCount: PropTypes.string,
  id: PropTypes.string,
  title: PropTypes.string,
  viewCount: PropTypes.string,
};

export default Player;
