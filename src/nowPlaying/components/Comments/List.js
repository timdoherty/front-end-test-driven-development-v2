import React from 'react';
import PropTypes from 'prop-types';

import Comment from './Comment';

function CommentsList(props) {
  const { comments } = props;
  return (
    <div>
      {comments.map(comment => (
        <Comment
          key={comment.id}
          author={comment.authorDisplayName}
          avatar={comment.authorProfileImageUrl}
          commentText={comment.textDisplay}
          dislikes={comment.dislikeCount}
          likes={comment.likeCount}
        />
      ))}
    </div>
  );
}

CommentsList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object),
};

CommentsList.defaultProps = { comments: [] };

export default CommentsList;
