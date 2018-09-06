import React from 'react';
import { shallow } from 'enzyme';

import List from './List';
import Preview from '../Preview';

describe('<List/>', () => {
  const listItems = [
    {
      "kind": "youtube#searchResult",
      "etag": "\"XI7nbFXulYBIpL0ayR_gDh3eu1k/fpqyMGwZZF7-34oQCdAKOsD8Si4\"",
      "id": {
        "kind": "youtube#video",
        "videoId": "4QdWRgNdir4"
      },
      "snippet": {
        "publishedAt": "2018-06-04T01:04:07.000Z",
        "channelId": "UCTg2TIWiAgr0FduTohrzj1A",
        "title": "Pat Metheny Group - Last Train Home (1 Hour Extended)",
        "description": "A Beautiful Song from Still Life (Talking)\nEnjoy the Hour!",
        "thumbnails": {
          "default": {
          "url": "https://i.ytimg.com/vi/4QdWRgNdir4/default.jpg",
          "width": 120,
          "height": 90
          },
          "medium": {
          "url": "https://i.ytimg.com/vi/4QdWRgNdir4/mqdefault.jpg",
          "width": 320,
          "height": 180
          },
          "high": {
          "url": "https://i.ytimg.com/vi/4QdWRgNdir4/hqdefault.jpg",
          "width": 480,
          "height": 360
          }
        },
        "channelTitle": "slyellow2 Music",
        "liveBroadcastContent": "none"
      },
      "id": "4QdWRgNdir4",
      "statistics": {
        "viewCount": "54"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "\"XI7mbFXulYBIpL0ayR_gDh3eu1k/fpqyMGwZZF7-34oQCdAKOsD8Si4\"",
      "id": {
        "kind": "youtube#video",
        "videoId": "8QdWRgNdir4"
      },
      "snippet": {
        "publishedAt": "2018-06-04T01:04:07.000Z",
        "channelId": "UCTg2TIWiAgr0FduTohrzj1A",
        "title": "Pat Metheny Group - Last Train Home (1 Hour Extended)",
        "description": "A Beautiful Song from Still Life (Talking)\nEnjoy the Hour!",
        "thumbnails": {
          "default": {
          "url": "https://i.ytimg.com/vi/4QdWRgNdir4/default.jpg",
          "width": 120,
          "height": 90
          },
          "medium": {
          "url": "https://i.ytimg.com/vi/4QdWRgNdir4/mqdefault.jpg",
          "width": 320,
          "height": 180
          },
          "high": {
          "url": "https://i.ytimg.com/vi/4QdWRgNdir4/hqdefault.jpg",
          "width": 480,
          "height": 360
          }
        },
        "channelTitle": "slyellow2 Music",
        "liveBroadcastContent": "none"
      },
      contentDetails: {
        duration: "00:05:32"
      },
      "id": "8QdWRgNdir4",
      "statistics": {
        "viewCount": "83"
      }
    }

  ];

  it('displays a preview for each item', () => {
    const wrapper = shallow(
      <List listItems={listItems} />
    );
    expect(wrapper.find(Preview).length).toBe(listItems.length);
  });

  it('responds with the right video id when an item is clicked', () => {
    const onListItemClickedMock = jest.fn();
    const wrapper = shallow(
      <List
        listItems={listItems}
        onListItemClicked={onListItemClickedMock}
        listItemIdField="id"
      />
    );

    wrapper.find(Preview).at(1).dive().simulate('click');
    expect(onListItemClickedMock).toBeCalledWith(listItems[1]);
  });
});
