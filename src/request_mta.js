import request from 'request';
import GtfsRealtimeBindings from '../util/gtfs-realtime';
import { parseFeed } from '../util/data_utils';

const req = {
  method: 'GET',
  url: 'https://crossorigin.me/http://datamine.mta.info/mta_esi.php?key=19308d0a671d13b31508fb043399d045&feed_id=16',
  encoding: null
};

export function requestMta() {
  request(req, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(body);
      const trainFeeds = parseFeed(feed);
      console.log(trainFeeds);
      console.log(feed);
      window.store.updateTrains(trainFeeds);
    }
  });
}
