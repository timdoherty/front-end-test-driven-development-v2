import React from 'react';
import { shallow } from 'enzyme';
import { createStore } from 'redux';

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
      // TODO remove actions prop once nowPlaying implemented
      const wrapper = shallow(
        <SearchResultListContainer
          actions={{
            nowPlaying: {
              setCurrentVideo: Function.prototype
            }
          }}
        />,
        { context: { store } }
      );
      const expected = searchSelector(getInitialState()).searchResults;
      const actual = wrapper.dive().dive().find('List').prop('searchResults');
      expect(actual).toEqual(expected);
    });
  });

  describe('dispatch', () => {
    it('correctly maps dispatch to props', () => {
      // TODO - remove once nowPlaying implemented
      const setCurrentVideoMock = jest.fn();
      const wrapper = shallow(
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
      const list = wrapper.dive().dive().find(List);
      list.props().onListItemClicked(list.prop('searchResults')[5]);
      expect(setCurrentVideoMock).toBeCalledWith(searchResults[5]);
    });
  });
});
