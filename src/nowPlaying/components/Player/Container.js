import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connectModule } from 'redux-modules';
import { withRouter } from 'react-router';
import { compose } from 'ramda';

import nowPlayingModule from '../../module';
import Player, { videoPropType } from './Player';

class PlayerContainer extends Component {
  componentDidMount() {
    const {
      actions: { getCurrentVideo },
      match: {
        params: { videoid },
      },
    } = this.props;
    if (!!videoid) {
      getCurrentVideo(videoid);
    }
  }

  render() {
    const { currentVideo } = this.props;
    if (!currentVideo) {
      return null;
    }
    return (
      <Player
        channelTitle={currentVideo.channelTitle}
        commentCount={currentVideo.commentCount}
        description={currentVideo.description}
        dislikeCount={currentVideo.dislikeCount}
        likeCount={currentVideo.likeCount}
        id={currentVideo.id}
        title={currentVideo.title}
        viewCount={currentVideo.viewCount}
      />
    );
  }
}

PlayerContainer.propTypes = {
  currentVideo: PropTypes.object,
};

export default compose(
  withRouter,
  connectModule(nowPlayingModule)
)(PlayerContainer);
