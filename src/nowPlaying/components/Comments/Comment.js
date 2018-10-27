import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '@procore/core-react';

import './Comment.css';
import thumbsupicon from '../../../assets/thumbsup.png';
import thumbsdownicon from '../../../assets/thumbsdown.png';

function Comment(props) {
  const { author, avatar, commentText, dislikes, likes } = props;

  return (
    <div className="comment-container">
      <div>
        <Avatar size="lg">
          <Avatar.Portrait imageUrl={avatar} />
        </Avatar>
      </div>
      <div>
        <div>{author}</div>
        <div>{commentText}</div>
        <div>
          <img src={thumbsupicon} />
          <span>{likes}</span>
          <img src={thumbsdownicon} />
          <span>{dislikes}</span>
        </div>
      </div>
    </div>
  );
}

Comment.propTypes = {
  author: PropTypes.string,
  avatar: PropTypes.string,
  commentText: PropTypes.string,
  dislikes: PropTypes.number,
  likes: PropTypes.number,
};

Comment.defaultProps = {
  author: '',
  avatar: '',
  commentText: '',
  dislikes: null,
  likes: null,
};

export default Comment;
