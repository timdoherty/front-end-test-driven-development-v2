import React from 'react';
import { shallow, mount } from 'enzyme';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';

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
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter>
            <SearchBarContainer />
          </MemoryRouter>
        </Provider>
      );

      expect(wrapper.find(SearchBar).prop('searchTerm')).toBe('foobarbaz');
    });
  });

  describe('dispatch', () => {
    it('performs a search', () => {
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter>
            <SearchBarContainer />
          </MemoryRouter>
        </Provider>
      );

      wrapper.find(SearchBar).props().onSearchChanged('foobarbaz');
      expect(dispatch).toBeCalledWith(actions.doSearch('foobarbaz'));
    });
  })
});
