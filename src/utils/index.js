import moment from 'moment';

export function formatDuration(duration) {
  return moment
    .utc(moment.duration(duration).asMilliseconds())
    .format('HH:mm:ss');
}

export function combineSearchData(searchResults, searchMeta) {
  return searchResults.map(result => {
    const meta = searchMeta.find(datum => datum.id === result.id.videoId) || {
      contentDetails: { duration: '' },
      statistics: {},
    };
    return {
      channelTitle: result.snippet.channelTitle,
      commentCount: meta.statistics.commentCount,
      description: result.snippet.description,
      dislikeCount: meta.statistics.dislikeCount,
      duration: formatDuration(meta.contentDetails.duration),
      etag: result.etag,
      id: result.id.videoId,
      likeCount: meta.statistics.likeCount,
      thumbnails: result.snippet.thumbnails,
      title: result.snippet.title,
      viewCount: meta.statistics.viewCount,
    };
  });
}
