import React from 'react';
import { mount } from 'enzyme';
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
        searchMetadata: { items: [] },
      },
    };
  }

  let store;
  let dispatch;

  beforeEach(() => {
    const reducer = state => state;
    dispatch = jest.fn();
    store = {
      ...createStore(reducer, getInitialState()),
      dispatch,
    };
  });

  describe('props', () => {
    it('has a search term', () => {
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
    it('performs a search and updates the web address when the search term changes', () => {
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter>
            <SearchBarContainer />
          </MemoryRouter>
        </Provider>
      );

      wrapper
        .find(SearchBar)
        .props()
        .onSearchChanged('foobarbaz');
      expect(wrapper.find('Router').prop('history').location.pathname).toBe(
        '/search/foobarbaz'
      );
      expect(dispatch).toBeCalledWith(actions.doSearch('foobarbaz'));
    });
  });
});
