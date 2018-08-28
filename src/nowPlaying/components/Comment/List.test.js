import React from 'react';
import { shallow } from 'enzyme';

import CommentsList from './List';
import Comment from './Comment';
import commentsStub from '../../stubs/commentsStub';

describe('<CommentsList/>', () => {
  it('displays a Comment for each item in the list', () => {
    const wrapper = shallow(
      <CommentsList comments={commentsStub.items} />
    );
    expect(wrapper.find(Comment).length).toBe(commentsStub.items.length);
  });
});
