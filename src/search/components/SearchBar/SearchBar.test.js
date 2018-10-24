import React from 'react';
import { shallow } from 'enzyme';
import { Input, Button } from '@procore/core-react';

import SearchBar from './SearchBar';

describe('<SearchBar/>', () => {
  it('has somewhere to enter search text', () => {
    const wrapper = shallow(<SearchBar />);
    expect(wrapper.find(Input).exists()).toBe.true;
  });

  it('initializes with the current search term', () => {
    const searchTerm = 'foobar';
    const wrapper = shallow(<SearchBar searchTerm={searchTerm} />);
    expect(wrapper.find(Input).prop('value')).toBe(searchTerm);
  });

  describe('when the user presses enter', () => {
    it('reacts when there is a search term', () => {
      const onSearchChangedMock = jest.fn();
      const wrapper = shallow(
        <SearchBar onSearchChanged={onSearchChangedMock} />
      );

      wrapper.find(Input).simulate('change', { target: { value: 'foo' } });
      wrapper.find(Input).simulate('keyup', { key: 'Enter' });
      expect(onSearchChangedMock).toBeCalledWith('foo');
    });

    it('does not react when there is no search term', () => {
      const onSearchChangedMock = jest.fn();
      const wrapper = shallow(
        <SearchBar onSearchChanged={onSearchChangedMock} />
      );

      wrapper
        .find(Input)
        .simulate('keyup', { key: 'Enter', target: { value: '' } });
      expect(onSearchChangedMock).not.toBeCalled();
    });
  });

  describe('when the user clicks the search button', () => {
    it('reacts when there is a search term', () => {
      const onSearchChangedMock = jest.fn();
      const searchTerm = 'fluffy unicorns';
      const wrapper = shallow(
        <SearchBar
          onSearchChanged={onSearchChangedMock}
          searchTerm={searchTerm}
        />
      );

      wrapper.find(Button).simulate('click');
      expect(onSearchChangedMock).toBeCalledWith(searchTerm);
    });

    it('does not react when there is no search term', () => {
      const onSearchChangedMock = jest.fn();
      const wrapper = shallow(
        <SearchBar onSearchChanged={onSearchChangedMock} />
      );

      wrapper.find(Button).simulate('click');
      expect(onSearchChangedMock).not.toBeCalled();
    });
  });
});
