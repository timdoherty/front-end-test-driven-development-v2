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

Player.propTypes = {
  channelTitle: PropTypes.string,
  commentCount: PropTypes.string,
  description: PropTypes.string,
  dislikeCount: PropTypes.string,
  likeCount: PropTypes.string,
  id: PropTypes.string,
  title: PropTypes.string,
  viewCount: PropTypes.string
};

export default Player;
