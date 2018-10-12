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
          author={comment.snippet.topLevelComment.snippet.authorDisplayName}
          avatar={comment.snippet.topLevelComment.snippet.authorProfileImageUrl}
          commentText={comment.snippet.topLevelComment.textDisplay}
          dislikes={comment.snippet.topLevelComment.dislikeCount}
          likes={comment.snippet.topLevelComment.likeCount}
        />
      ))}
    </div>
  );
}

CommentsList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object)
};

CommentsList.defaultProps = { comments: [] };

export default CommentsList;
