import React from 'react';
import { Route } from 'react-router-dom';

import SearchBar from '../../search/components/SearchBar';
import SearchResultsListContainer from '../../search/components/List';
import Player from '../../nowPlaying/components/Player';
import Comments from '../../nowPlaying/components/Comments';
import RelatedVideos from '../../nowPlaying/components/RelatedVideos';

function Layout(props) {
  return (
    <div>
      <SearchBar />
      <Route path='/search/:searchTerm' render={({ match }) => (
        <SearchResultsListContainer key={match.params.searchTerm} />
      )}/>
      <Route path='/now-playing/:videoid' render={({ match }) => {
        return (
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 1 }}>
              <Player key={match.params.videoid}/>
              <Comments />
            </div>
            <div style={{ flex: '0 0 400px'}}>
              <RelatedVideos />
            </div>
          </div>
        )
      }} />
    </div>
  );
} 

export default Layout;

