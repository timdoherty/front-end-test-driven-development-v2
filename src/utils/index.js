import moment from 'moment';

export function formatDuration(duration) {
  return moment.utc(moment.duration(duration).asMilliseconds()).format("HH:mm:ss");
}

export function combineSearchData(searchResults, searchMeta) {
  return searchResults.map(result => {
    const meta = searchMeta.find(
      datum => datum.id === result.id.videoId
    ) || { contentDetails: { duration: '' } };
    return {
      ...result,
      ...meta,
      id: result.id.videoId,
      contentDetails: {
        ...meta.contentDetails,
        duration: formatDuration(meta.contentDetails.duration)
      },
      statistics: meta ? meta.statistics || {} : {}
    };
  });
}
