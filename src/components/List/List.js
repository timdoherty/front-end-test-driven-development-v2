import React from 'react';
import PropTypes from 'prop-types';

import Preview from '../Preview';

function List(props) {
  const {
    listItems,
    thumbnailSize,
    showDescription
  } = props;

  return (
    <div>
      {listItems.map(item => (
        <Preview 
          key={item.etag}
          channelTitle={item.channelTitle}
          description={!!showDescription && item.description}
          thumbnail={item.snippet.thumbnails[thumbnailSize]}
          viewCount={item.statistics.viewCount}
        />
      ))}
    </div>
  );
}

const thumbnailProptype = PropTypes.shape({
  url: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number
});

List.propTypes = {
  listItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.shape({
        videoId: PropTypes.string
      }),
      snippet: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        channelTitle: PropTypes.string,
        thumbnails: PropTypes.shape({
          default: thumbnailProptype,
          medium: thumbnailProptype,
          high: thumbnailProptype
        })
      }),
      statistics: PropTypes.shape({
        viewCount: PropTypes.string
      })
    })
  ),
  onListItemClicked: PropTypes.func,
  thumbnailSize: PropTypes.string,
  showDescription: PropTypes.bool
};

List.defaultProps = {
  listItems: [],
  thumbnailSize: 'default',
  showDescription: true
};

export default List;
