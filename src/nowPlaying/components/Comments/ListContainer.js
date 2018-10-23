import React from 'react';
import PropTypes from 'prop-types';
import { connectModule } from 'redux-modules';

import Comment from './Comment';
import nowPlayingModule from '../../module';

function ListContainer(props) {
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

ListContainer.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object),
};

ListContainer.defaultProps = { comments: [] };

export default connectModule(nowPlayingModule)(ListContainer);
