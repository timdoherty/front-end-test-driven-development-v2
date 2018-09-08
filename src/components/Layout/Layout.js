import React from 'react';
import { connect } from 'react-redux';

import './App.css';
import SearchBar from '../../search/components/SearchBar';
import SearchResultsListContainer from '../../search/components/List';
import Player from '../../nowPlaying/components/Player';
import Comments from '../../nowPlaying/components/Comments';
import RelatedVideos from '../../nowPlaying/components/RelatedVideos';

function Layout(props) {
  const { currentVideo } = props;
  return (
    <div className="App">
      <header className="App-header">
        <SearchBar />
      </header>
      { !currentVideo && <SearchResultsListContainer />}
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <Player />
          <Comments />
        </div>
        <div style={{ flex: '0 0 400px'}}>
          <RelatedVideos />
        </div>
      </div>
    </div>
  );
} 

export default connect(state => ({
  currentVideo: state.nowPlaying.currentVideo
}))(Layout);
