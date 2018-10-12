import { combineSearchData } from './index';
import searchResultsStubs from '../search/stubs/searchResultsStub';
import searchMetadataStubs from '../search/stubs/searchMetadataStub';

const coalescedResult = {
  etag: '"XI7nbFXulYBIpL0ayR_gDh3eu1k/Va5WaCfLWg9_P0lB4Olj9aRA5ZI"',
  title: 'Pat Metheny Group - To The End of the World (1 Hour Extended)',
  description:
    "1 Hour extend of My favorite Metheny's song. Please check also my House Remix for this song. Pat Metheny - To the End of the World (Ymbk Borraginol Edit) ...",
  thumbnails: {
    default: {
      url: 'https://i.ytimg.com/vi/2Gm7L3LEyz8/default.jpg',
      width: 120,
      height: 90,
    },
    medium: {
      url: 'https://i.ytimg.com/vi/2Gm7L3LEyz8/mqdefault.jpg',
      width: 320,
      height: 180,
    },
    high: {
      url: 'https://i.ytimg.com/vi/2Gm7L3LEyz8/hqdefault.jpg',
      width: 480,
      height: 360,
    },
  },
  channelTitle: 'slyellow2 Music',
  id: '2Gm7L3LEyz8',
  duration: '00:58:54',
  viewCount: '619624',
  likeCount: '4039',
  dislikeCount: '238',
  commentCount: '323',
};

describe('utils', () => {
  it('combines search results and metadata', () => {
    const actual = combineSearchData(
      [searchResultsStubs.items[0]],
      [searchMetadataStubs.items[0]]
    );
    expect(actual).toEqual([coalescedResult]);
  });
});
