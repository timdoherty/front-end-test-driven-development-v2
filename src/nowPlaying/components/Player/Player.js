import React from 'react';
import PropTypes from 'prop-types';

import './Player.css';
import thumbsupicon from '../../../assets/thumbsup.png';
import thumbsdownicon from '../../../assets/thumbsdown.png';

function Player(props) {
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
        <div>
          <span className="view-count">{`${viewCount} views`}</span>
          <div className="likes">
            <img src={thumbsupicon} /><span>{likeCount}</span>
            <img src={thumbsdownicon} /><span>{dislikeCount}</span>
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

export const videoPropType = PropTypes.shape({
    id: PropTypes.string,
    snippet: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      channelTitle: PropTypes.string
    }),
    statistics: PropTypes.shape({
      viewCount: PropTypes.string,
      likeCount: PropTypes.string,
      dislikeCount: PropTypes.string,
      commentCount: PropTypes.string
    })
  });

Player.propTypes = { video: videoPropType };
Player.defaultProps = { video: null };

export default Player;
