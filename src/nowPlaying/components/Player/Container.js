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
      match: { params: { videoid } }
    } = this.props;
    if (!!videoid) {
      getCurrentVideo(videoid);
    }
  }

  render () {
    const { currentVideo } = this.props;
    if (!currentVideo) {
      return null;
    }
 
    return (
      <Player
        channelTitle={currentVideo.snippet.channelTitle}
        commentCount={currentVideo.statistics.commentCount}
        description={currentVideo.snippet.description}
        dislikeCount={currentVideo.statistics.dislikeCount}
        likeCount={currentVideo.statistics.likeCount}
        id={currentVideo.id}
        title={currentVideo.snippet.title}
        viewCount={currentVideo.statistics.viewCount}
      />
    );
  }
}

PlayerContainer.propTypes = {
  currentVideo: videoPropType
};

export default compose(
  withRouter,
  connectModule(nowPlayingModule),
)(PlayerContainer);
