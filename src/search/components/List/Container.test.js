import React from 'react';
import { shallow, mount } from 'enzyme';
import { createStore, combineReducers } from 'redux';

import SearchResultListContainer from './Container';
import List from './List';
import searchResultStubs from '../../stubs/searchResultsStub';
import searchMetadataStubs from '../../stubs/searchMetadataStub';
import searchSelector from '../../selector';

describe('<SearchResultListContainer/>', () => {
  function getInitialState() {
    return {
      search: {
        searchResults: searchResultStubs,
        searchMetadata: searchMetadataStubs 
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
        <SearchResultListContainer />,
        { context: { store } }
      );
      const expected = searchSelector(getInitialState()).searchResults;
      const actual = wrapper.prop('searchResults');
      expect(actual).toEqual(expected);
    });
  });

  describe('dispatch', () => {
    it('correctly maps dispatch to props', () => {
      // TODO - remove once nowPlaying implemented
      const setCurrentVideoMock = jest.fn();
      const wrapper = mount(
        <SearchResultListContainer
          actions={{
            nowPlaying: {
              setCurrentVideo: setCurrentVideoMock
            }
          }}
        />,
        { context: { store } }
      );

      const searchResults = searchSelector(getInitialState()).searchResults;
      wrapper.find(List).props().onListItemClicked(searchResults[5]);
      expect(setCurrentVideoMock).toBeCalledWith(searchResults[5]);
    });
  });
});
