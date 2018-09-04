import React from 'react';
import { Avatar } from '@procore/core-react';

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
