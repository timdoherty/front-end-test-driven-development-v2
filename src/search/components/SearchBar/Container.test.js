import React from 'react';
import { shallow, mount } from 'enzyme';
import { createStore } from 'redux';

import SearchBarContainer from './Container';
import SearchBar from './SearchBar';
import searchModule from '../../module';

const { actions } = searchModule;

describe('<SearchBarContainer/>', () => {
  function getInitialState() {
    return {
      search: {
        searchTerm: 'foobarbaz'
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

      expect(wrapper.prop('searchTerm')).toBe('foobarbaz');
    });
  });

  describe.only('dispatch', () => {
    it('mounts the component', () => {
      const wrapper = mount(
        <SearchBarContainer />,
        { context: { store } }
      );

      wrapper.find(SearchBar).props().onSearchChanged('foobarbaz');
      expect(dispatch).toBeCalledWith(actions.setSearchTerm('foobarbaz'));
    });
  })
});
