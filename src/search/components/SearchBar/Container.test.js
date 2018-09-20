import React from 'react';
import { shallow } from 'enzyme';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import SearchBarContainer from './Container';
import SearchBar from './SearchBar';
import searchModule from '../../module';

const { actions } = searchModule;

describe('<SearchBarContainer/>', () => {
  function getInitialState() {
    return {
      search: {
        searchTerm: 'foobarbaz',
        searchResults: { items: [] },
        searchMetadata: { items: [] }
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
        <SearchBarContainer />,
        { context: { store } }
      );

      expect(wrapper.dive().dive().find(SearchBar).prop('searchTerm')).toBe('foobarbaz');
    });
  });

  describe('dispatch', () => {
    it('mounts the component', () => {
      const wrapper = shallow(
        <SearchBarContainer />,
        { context: { store } }
      );

      wrapper.dive().dive().find(SearchBar).props().onSearchChanged('foobarbaz');
      expect(dispatch).toBeCalledWith(actions.doSearch('foobarbaz'));
    });
  })
});
