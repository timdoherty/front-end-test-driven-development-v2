import React from 'react';
import { shallow } from 'enzyme';

import List from './List';
import Preview from '../Preview';
import searchModule from '../../search/module';
import searchResultStubs from '../../search/stubs/searchResultsStub';
import searchMetadataStubs from '../../search/stubs/searchMetadataStub';

const { selector } = searchModule;

describe('<List/>', () => {
  const listItems = selector({
    search: {
      searchResults: searchResultStubs,
      searchMetadata: searchMetadataStubs,
    },
  }).searchResults;

  it('displays a preview for each item', () => {
    const wrapper = shallow(<List listItems={listItems} />);
    expect(wrapper.find(Preview).length).toBe(listItems.length);
  });

  it('provides video information to a list item', () => {
    const wrapper = shallow(<List listItems={listItems} />);
    const expected = listItems[0];
    const actual = wrapper
      .find(Preview)
      .first()
      .props();

    expect(actual.channelTitle).toBe(expected.channelTitle);
    expect(actual.description).toBe(expected.description);
    expect(actual.duration).toBe(expected.duration);
    expect(actual.id).toBe(expected.id);
    expect(actual.thumbnail).toEqual(expected.thumbnails.default);
    expect(actual.title).toBe(expected.title);
    expect(actual.viewCount).toBe(expected.viewCount);
  });

  it('provides a thumbnail size overrride for each preview item', () => {
    const wrapper = shallow(
      <List listItems={listItems} thumbnailSize="high" />
    );

    expect(
      wrapper
        .find(Preview)
        .at(0)
        .prop('thumbnail')
    ).toEqual(listItems[0].thumbnails.high);
  });

  it('provides an override to hide descriptions for list items', () => {
    const wrapper = shallow(
      <List listItems={listItems} showDescription={false} />
    );

    expect(
      wrapper
        .find(Preview)
        .at(0)
        .prop('description')
    ).toBe(false);
  });
});
