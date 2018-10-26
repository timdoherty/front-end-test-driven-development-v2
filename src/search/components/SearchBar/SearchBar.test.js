import React from 'react';
import { shallow } from 'enzyme';

import { SearchBar } from './SearchBar';

describe('<SearchBar/>', () => {
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
