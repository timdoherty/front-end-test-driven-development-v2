import React from 'react';
import { shallow } from 'enzyme';
import { Card } from '@procore/core-react';

import Thumbnail from './Thumbnail';

describe('<Thumbnail/>', () => {
  it('displays an image', () => {
    const url = "foobarbaz";
    const wrapper = shallow(
      <Thumbnail imageUrl={url} />
    );

    expect(wrapper.find('img').prop('src')).toBe(url);
  });

  it('has dimensions', () => {
    const style = { height: '100px', width: '300px' };
    const wrapper = shallow(
      <Thumbnail height={100} width={300} />
    );

    expect(wrapper.find(Card).prop('style')).toEqual(style);
    expect(wrapper.find('img').prop('height')).toEqual('100');
    expect(wrapper.find('img').prop('width')).toEqual('300');
  });

  it('shows duration', () => {
    const wrapper = shallow(
      <Thumbnail duration="foobarbaz" /> 
    );

    expect(wrapper.findWhere(n => n.text() === 'foobarbaz').exists()).toBe(true);
  });
});
