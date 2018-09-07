import React from 'react';
import { Avatar } from '@procore/core-react';

import './Comment.css';
import thumbsupicon from '../../../assets/thumbsup.png';
import thumbsdownicon from '../../../assets/thumbsdown.png';

export default function Comment(props) {
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
    <div className="comment-container">
      <div>
        <Avatar size="lg">
          <Avatar.Portrait imageUrl={authorProfileImageUrl}/>
        </Avatar>
      </div>
      <div>
        <div>{authorDisplayName}</div>
        <div>{textDisplay}</div>
        <div>
          <img src={thumbsupicon} /><span>{likeCount}</span>
          <img src={thumbsdownicon} /><span>{dislikeCount}</span>
        </div>
      </div>
    </div>
  );
}
