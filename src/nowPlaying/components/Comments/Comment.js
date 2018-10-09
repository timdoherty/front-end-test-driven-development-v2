import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '@procore/core-react';

function Comment(props) {
  const {
    author,
    avatar,
    commentText,
    dislikes,
    likes
  } = props;

  return (
    <div>
      <Avatar size="lg">
        <Avatar.Portrait imageUrl={avatar}/>
      </Avatar>
      <span>{author}</span>
      <span>{commentText}</span>
      <span>{likes}</span>
      <span>{dislikes}</span>
    </div>
  );
}

Comment.propTypes = {
  author: PropTypes.string,
  avatar: PropTypes.string,
  commentText: PropTypes.string,
  dislikes: PropTypes.number,
  likes: PropTypes.number
};

Comment.defaultProps = {
  author: '',
  avatar: '',
  commentText: '',
  dislikes: null,
  likes: null
};

export default Comment;
