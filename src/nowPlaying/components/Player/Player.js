import React from 'react';
import PropTypes from 'prop-types';

function Player(props) {
  const {
    channelTitle,
    commentCount,
    description,
    dislikeCount,
    likeCount,
    id,
    title,
    viewCount
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
