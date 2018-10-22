import React from 'react';
import PropTypes from 'prop-types';

import Preview from '../Preview';

function List(props) {
  const { listItems, thumbnailSize, showDescription } = props;

  return (
    <div>
      {listItems.map(item => (
        <Preview
          key={item.etag}
          channelTitle={item.channelTitle}
          description={!!showDescription && item.description}
          duration={item.duration}
          id={item.id}
          thumbnail={item.thumbnails[thumbnailSize]}
          title={item.title}
          viewCount={item.viewCount}
        />
      ))}
    </div>
  );
}

const thumbnailProptype = PropTypes.shape({
  url: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
});

export const previewPropType = PropTypes.shape({
  description: PropTypes.string,
  channelTitle: PropTypes.string,
  duration: PropTypes.string,
  id: PropTypes.string,
  thumbnail: thumbnailProptype,
  title: PropTypes.string,
  viewCount: PropTypes.string,
});

List.propTypes = {
  listItems: PropTypes.arrayOf(previewPropType),
  onListItemClicked: PropTypes.func,
  thumbnailSize: PropTypes.string,
  showDescription: PropTypes.bool,
};

List.defaultProps = {
  listItems: [],
  thumbnailSize: 'default',
  showDescription: true,
};

export default List;
