import request from 'request';
import GtfsRealtimeBindings from '../util/gtfs-realtime';
import { parseFeed } from '../util/train_utils';

const req = {
  method: 'GET',
  url: 'https://crossorigin.me/http://datamine.mta.info/mta_esi.php?key=19308d0a671d13b31508fb043399d045&feed_id=21',
  encoding: null
};

function requestMta () {
  request(req, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(body);
      parseFeed(feed);
    }
  });
}

export default requestMta;
