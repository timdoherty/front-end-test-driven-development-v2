import React from 'react';
import { shallow, mount } from 'enzyme';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';

import SearchBarContainer, { SearchBar } from './SearchBar';
import searchModule from '../../module';

const { actions } = searchModule;

describe('<SearchBar/>', () => {
  describe('presenter', () => {
    let wrapper;
    const historyMock = {
      push: jest.fn(),
    };

    beforeEach(() => {
      historyMock.push.mockClear();
    });

    function render(props) {
      return shallow(
        <SearchBar
          history={historyMock}
          match={{ path: '', params: '' }}
          {...props}
        />
      );
    }

    it('has somewhere to enter search text', () => {
      wrapper = render({});
      expect(wrapper.find('Input').exists()).toBe(true);
    });

    it('initializes with the current search term', () => {
      const searchTerm = 'foobar';
      wrapper = render({ searchTerm });
      expect(wrapper.find('Input').prop('value')).toBe(searchTerm);
    });

    it('responds when given a search url', () => {
      const searchTerm = 'Gandalf';
      const doSearchMock = jest.fn();
      wrapper = render({
        actions: { doSearch: doSearchMock },
        match: { params: { path: 'search', pathParam: searchTerm } },
      });

      expect(doSearchMock).toBeCalledWith(searchTerm);
      expect(historyMock.push).toHaveBeenCalledWith(`/search/${searchTerm}`);
    });

    describe('when the user presses enter', () => {
      it('responds when there is a search term', () => {
        const doSearchMock = jest.fn();
        const searchTerm = 'foo';
        wrapper = render({ actions: { doSearch: doSearchMock } });

        wrapper
          .find('Input')
          .simulate('change', { target: { value: searchTerm } });
        wrapper.find('Input').simulate('keyup', { key: 'Enter' });

        expect(doSearchMock).toBeCalledWith(searchTerm);
        expect(historyMock.push).toHaveBeenCalledWith(`/search/${searchTerm}`);
      });

      it('does not respond when there is no search term', () => {
        const doSearchMock = jest.fn();
        wrapper = render({ actions: { doSearch: doSearchMock } });

        wrapper
          .find('Input')
          .simulate('keyup', { key: 'Enter', target: { value: '' } });

        expect(doSearchMock).not.toBeCalled();
      });
    });

    describe('when the user clicks the search button', () => {
      it('responds when there is a search term', () => {
        const doSearchMock = jest.fn();
        const searchTerm = 'fluffy unicorns';
        wrapper = render({ actions: { doSearch: doSearchMock }, searchTerm });

        wrapper.find('Button').simulate('click');

        expect(doSearchMock).toBeCalledWith(searchTerm);
        expect(historyMock.push).toHaveBeenCalledWith(`/search/${searchTerm}`);
      });

      it('does not respond when there is no search term', () => {
        const doSearchMock = jest.fn();
        wrapper = render({ actions: { doSearch: doSearchMock } });

        wrapper.find('Button').simulate('click');

        expect(doSearchMock).not.toBeCalled();
      });
    });
  });

  describe('container', () => {
    let wrapper;
    let store;
    let dispatch;
    const searchTerm = 'the one ring';

    beforeEach(() => {
      dispatch = jest.fn();
      const reducer = state => state;
      store = {
        ...createStore(reducer, { search: { searchTerm } }),
        dispatch,
      };
    });

    function render(props) {
      return mount(
        <Provider store={store}>
          <MemoryRouter>
            <SearchBarContainer />
          </MemoryRouter>
        </Provider>
      );
    }

    it('has a search term', () => {
      wrapper = render();
      expect(wrapper.find('SearchBar').prop('searchTerm')).toBe(searchTerm);
    });

    it('responds when the user initiates a search', () => {
      wrapper = render();
      wrapper
        .find('SearchBar')
        .instance()
        .doSearch();

      expect(dispatch).toHaveBeenCalledWith(actions.doSearch(searchTerm));
      expect(wrapper.find('Router').prop('history').location.pathname).toBe(
        `/search/${searchTerm}`
      );
    });
  });
});
