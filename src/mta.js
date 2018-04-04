import request from 'request';
import GtfsRealtimeBindings from '../util/gtfs-realtime';
import { parseFeed } from '../util/data_utils';
import Store from '../store/store';
import { updateTime } from './page_setup';

export function fetchMtaData(store) {
  const urls = [
    // 'https://crossorigin.me/http://datamine.mta.info/mta_esi.php?key=19308d0a671d13b31508fb043399d045&feed_id=1',
    'https://crossorigin.me/http://datamine.mta.info/mta_esi.php?key=19308d0a671d13b31508fb043399d045&feed_id=26',
    'https://crossorigin.me/http://datamine.mta.info/mta_esi.php?key=19308d0a671d13b31508fb043399d045&feed_id=16',
    'https://crossorigin.me/http://datamine.mta.info/mta_esi.php?key=19308d0a671d13b31508fb043399d045&feed_id=21',
    // 'https://crossorigin.me/http://datamine.mta.info/mta_esi.php?key=19308d0a671d13b31508fb043399d045&feed_id=2',
    'https://crossorigin.me/http://datamine.mta.info/mta_esi.php?key=19308d0a671d13b31508fb043399d045&feed_id=11',
    'https://crossorigin.me/http://datamine.mta.info/mta_esi.php?key=19308d0a671d13b31508fb043399d045&feed_id=31',
    'https://crossorigin.me/http://datamine.mta.info/mta_esi.php?key=19308d0a671d13b31508fb043399d045&feed_id=36',
    'https://crossorigin.me/http://datamine.mta.info/mta_esi.php?key=19308d0a671d13b31508fb043399d045&feed_id=51'
  ];

  urls.forEach((url) => {
    const req = {
      method: 'GET',
      url: url,
      encoding: null
    };
    requestMta(store, req)
  })
}

function requestMta(store, req) {
  console.log("Fetching");
  request(req, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log("200 OK");
      status = 200;
      updateTime();
      const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(body);
      const parsedFeed = parseFeed(feed);
      store.updateTrains(parsedFeed);
    } else {
      // setup a condition to break out of loop
      window.setTimeout(() => requestMta(store, req), 3000);
    }
  });
}
