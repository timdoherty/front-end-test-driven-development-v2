import React from 'react';
import PropTypes from 'prop-types';

import Preview from '../Preview';

function List(props) {
  const { listItems, thumbnailSize, showDescription } = props;

  return (
    <div className={props.className}>
      {listItems.map(item => (
        <Preview
          key={item.etag}
          channelTitle={item.channelTitle}
          description={!!showDescription && item.description}
          id={item.id}
          thumbnail={item.thumbnails[thumbnailSize]}
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
  id: PropTypes.string,
  snippet: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    channelTitle: PropTypes.string,
    thumbnails: PropTypes.shape({
      default: thumbnailProptype,
      medium: thumbnailProptype,
      high: thumbnailProptype,
    }),
  }),
  statistics: PropTypes.shape({
    viewCount: PropTypes.string,
  }),
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
