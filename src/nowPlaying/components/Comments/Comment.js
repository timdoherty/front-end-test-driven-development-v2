import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '@procore/core-react';

function Comment(props) {
  const {
    comment: {
      snippet: {
        topLevelComment: {
          snippet: {
            authorProfileImageUrl,
            authorDisplayName,
            textDisplay,
            likeCount,
            dislikeCount
          }
        }
      }
    }
  } = props;

  return (
    <div>
      <Avatar size="lg">
        <Avatar.Portrait imageUrl={authorProfileImageUrl}/>
      </Avatar>
      <span>{authorDisplayName}</span>
      <span>{textDisplay}</span>
      <span>{likeCount}</span>
      <span>{dislikeCount}</span>
    </div>
  );
}

export const commentPropType = {
  snippet: PropTypes.shape({
    topLevelComment: PropTypes.shape({
      snippet: PropTypes.shape({
        authorProfileImageUrl: PropTypes.string,
        authorDisplayName: PropTypes.string,
        textDisplay: PropTypes.string,
        likeCount: PropTypes.number,
        dislikeCount: PropTypes.number
      })
    })
  })
};

Comment.propTypes = {
  comment: commentPropType
};

Comment.defaultProps = {
  comment: {
    snippet: {
      topLevelComment: {
        snippet: {
          authorProfileImageUrl: '',
          authorDisplayName: '',
          textDisplay: '',
          likeCount: 0,
          dislikeCount: 0
        }
      }
    }
  }
};

export default Comment;
