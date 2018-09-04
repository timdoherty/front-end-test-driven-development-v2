import React from 'react';
import { shallow } from 'enzyme';
import { Input } from '@procore/core-react';

import SearchBar from './SearchBar';

describe('<SearchBar/>', () => {
  it('has somewhere to enter search text', () => {
    const wrapper = shallow(
      <SearchBar />
    );
    expect(wrapper.find(Input).exists()).toBe.true;
  });

  describe('when the user presses enter', () => {
    it('reacts when there is a search term', () => {
      const onSearchChangedMock= jest.fn();
      const wrapper = shallow(
        <SearchBar onSearchChanged={onSearchChangedMock} />
      );

      wrapper.find(Input).simulate('keyup', { key: 'Enter', target: { value: 'foo' } });
      expect(onSearchChangedMock).toBeCalledWith('foo');
    });

    it('does not react when there is no search term', () => {
      const onSearchChangedMock= jest.fn();
      const wrapper = shallow(
        <SearchBar onSearchChanged={onSearchChangedMock} />
      );

      wrapper.find(Input).simulate('keyup', { key: 'Enter', target: { value: '' } });
      expect(onSearchChangedMock).not.toBeCalled();
    });
  });
});
