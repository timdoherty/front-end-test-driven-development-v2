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
      return shallow(<SearchBar {...props} history={historyMock} />);
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

    describe('when the user presses enter', () => {
      it('responds when there is a search term', () => {
        const onSearchChangedMock = jest.fn();
        const searchTerm = 'foo';
        wrapper = render({ onSearchChanged: onSearchChangedMock });

        wrapper
          .find('Input')
          .simulate('change', { target: { value: searchTerm } });
        wrapper.find('Input').simulate('keyup', { key: 'Enter' });

        expect(onSearchChangedMock).toBeCalledWith(searchTerm);
        expect(historyMock.push).toHaveBeenCalledWith(`/search/${searchTerm}`);
      });

      it('does not respond when there is no search term', () => {
        const onSearchChangedMock = jest.fn();
        wrapper = render({ onSearchChanged: onSearchChangedMock });

        wrapper
          .find('Input')
          .simulate('keyup', { key: 'Enter', target: { value: '' } });

        expect(onSearchChangedMock).not.toBeCalled();
      });
    });

    describe('when the user clicks the search button', () => {
      it('responds when there is a search term', () => {
        const onSearchChangedMock = jest.fn();
        const searchTerm = 'fluffy unicorns';
        wrapper = render({ onSearchChanged: onSearchChangedMock, searchTerm });

        wrapper.find('Button').simulate('click');

        expect(onSearchChangedMock).toBeCalledWith(searchTerm);
        expect(historyMock.push).toHaveBeenCalledWith(`/search/${searchTerm}`);
      });

      it('does not respond when there is no search term', () => {
        const onSearchChangedMock = jest.fn();
        wrapper = render({ onSearchChanged: onSearchChangedMock });

        wrapper.find('Button').simulate('click');

        expect(onSearchChangedMock).not.toBeCalled();
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
