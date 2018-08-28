import React from 'react';
import { shallow, mount } from 'enzyme';
import { createStore, combineReducers } from 'redux';

import ListContainer from './Container';
import Preview from '../../../components/Preview';
import searchResultStubs from '../../stubs/searchResultsStub';
import searchMetadataStubs from '../../stubs/searchMetadataStub';
import searchSelector from '../../selector';

describe('<ListContainer/>', () => {
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

  afterEach(() => {
    // tear down each test here (or use after() for all)
  });

  describe('props', () => {
    it('correctly maps state to props', () => {
      const wrapper = shallow(
        <ListContainer />,
        { context: { store } }
      );
      const expected = searchSelector(getInitialState()).searchResults;
      const actual = wrapper.prop('searchResults');
      expect(actual).toEqual(expected);
    });
  });

  describe('dispatch', () => {
    it('correctly maps dispatch to props', () => {
      // TODO replace this with actual dispatch test
      const setNowPlayingMock = jest.fn();
      const wrapper = mount(
        <ListContainer actions={{ setNowPlaying: setNowPlayingMock }}/>,
        { context: { store } }
      );

      const searchResults = searchSelector(getInitialState()).searchResults;
      wrapper.find(Preview).at(5).simulate('click');
      expect(setNowPlayingMock).toBeCalledWith(searchResults[5].id);
    });
  });
});
