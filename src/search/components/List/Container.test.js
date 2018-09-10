import React from 'react';
import { shallow, mount } from 'enzyme';
import { createStore, combineReducers } from 'redux';

import SearchResultsListContainer from './Container';
import List from '../../../components/List';
import searchResultStubs from '../../stubs/searchResultsStub';
import searchMetadataStubs from '../../stubs/searchMetadataStub';
import searchSelector from '../../selector';
import nowPlayingModule from '../../../nowPlaying/module';

const { actions } = nowPlayingModule;

describe('<SearchResultsListContainer/>', () => {
  function getInitialState() {
    return {
      search: {
        searchResults: searchResultStubs,
        searchMetadata: searchMetadataStubs 
      },
      nowPlaying: {
        comments: { items: [] },
        relatedVideos: { items: [] },
        relatedVideoMetadata: { items: [] }
      }
    };
  }

  let store;
  let dispatch;

  beforeEach(() => {
    const reducer = state => state; 
    dispatch = jest.fn();
    store = {
      ...createStore(reducer, getInitialState()),
      dispatch
    };
  });

  describe('props', () => {
    it('correctly maps state to props', () => {
      const wrapper = shallow(
        <SearchResultsListContainer />,
        { context: { store } }
      );
      const expected = searchSelector(getInitialState()).searchResults;
      const actual = wrapper.prop('search').searchResults;
      expect(actual).toEqual(expected);
    });
  });

  describe('dispatch', () => {
    it('correctly maps dispatch to props', () => {
      const wrapper = mount(
        <SearchResultsListContainer />,
        { context: { store } }
      );

      const searchResults = searchSelector(getInitialState()).searchResults;
      const list = wrapper.find(List);
      list.props().onListItemClicked(list.prop('searchResults')[5]);
      expect(dispatch).toBeCalledWith(actions.setCurrentVideo(searchResults[5]));
    });
  });
});
