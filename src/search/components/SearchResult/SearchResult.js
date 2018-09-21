import React from 'react';
import PropTypes from 'prop-types';

import Thumbnail from '../../../components/Thumbnail';

function SearchResult(props) {
  const { result, onClick } = props;
  const {
    snippet: {
      title,
      description,
      channelTitle,
      thumbnails: {
        default: thumbnail
      }
    },
    statistics: {
      viewCount
    }
  } = result;

  return (
    <div onClick={() => onClick(result)}>
      <Thumbnail
        imageUrl={thumbnail.url}
        height={thumbnail.height}
        width={thumbnail.width}
      />
      <span>{title}</span>
      <span>{channelTitle}</span>
      <span>{`${viewCount} views`}</span>
      <span>{description}</span>
    </div>
  );
}

SearchResult.propTypes = {
  result: PropTypes.shape({
    snippet: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      channelTitle: PropTypes.string,
      thumbnails: PropTypes.shape({
        default: PropTypes.shape({
          url: PropTypes.string,
          width: PropTypes.number,
          height: PropTypes.number
        })
      })
    }),
    statistics: PropTypes.shape({
      viewCount: PropTypes.string
    })
  }),
  onClick: PropTypes.func
};

SearchResult.defaultProps = {
  result: {},
  onClick: Function.prototype
};

export default SearchResult;
