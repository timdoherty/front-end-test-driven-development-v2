import moment from 'moment';

export function formatDuration(duration) {
  return moment.utc(moment.duration(duration).asMilliseconds()).format("HH:mm:ss");
}
