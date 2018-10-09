import React from 'react';
import { shallow } from 'enzyme';
import { createStore } from 'redux';

import RelatedVideosContainer from './Container';
import relatedVideoStubs from '../../stubs/relatedVideosStub';
import relatedVideoMetadataStbus from '../../stubs/relatedVideoMetadataStub';
import nowPlayingSelector from '../../selector';
import List from '../../../components/List';

describe('<RelatedVideosContainer/>', () => {
  function getInitialState() {
    return {
      nowPlaying: {
        comments: { items: [] },
        relatedVideos: relatedVideoStubs,
        relatedVideoMetadata: relatedVideoMetadataStbus 
      }
    };
  }

  let store;

  beforeEach(() => {
    const reducer = state => state; 
    store = createStore(reducer, getInitialState());
  });

  describe('props', () => {
    it('correctly maps state to props', () => {
      const wrapper = shallow(
        <RelatedVideosContainer />,
        { context: { store } }
      );
      const expected = nowPlayingSelector(getInitialState()).relatedVideos;
      const actual = wrapper.dive().dive().find(List).prop('listItems');
      expect(actual).toEqual(expected);
    });
  });
});
