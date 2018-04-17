import request from 'request';
import GtfsRealtimeBindings from '../gtfs-realtime';
import { parseFeed } from '../utils/data_utils';
import { updateTime } from './page_setup';

export function fetchMtaData(store) {
  const urls = [
    // 1, 2, 3, 4, 5, 6, S lines
    'https://crossorigin.me/http://datamine.mta.info/mta_esi.php?key=19308d0a671d13b31508fb043399d045&feed_id=1',
    // A, C, E, H, S(Franklin Ave. Shuttle) lines
    'https://crossorigin.me/http://datamine.mta.info/mta_esi.php?key=19308d0a671d13b31508fb043399d045&feed_id=26',
    // N, Q, R, W lines
    'https://crossorigin.me/http://datamine.mta.info/mta_esi.php?key=19308d0a671d13b31508fb043399d045&feed_id=16',
    // B, D, F, N lines
    'https://crossorigin.me/http://datamine.mta.info/mta_esi.php?key=19308d0a671d13b31508fb043399d045&feed_id=21',
    // L line
    'https://crossorigin.me/http://datamine.mta.info/mta_esi.php?key=19308d0a671d13b31508fb043399d045&feed_id=2',
    // SIR line
    'https://crossorigin.me/http://datamine.mta.info/mta_esi.php?key=19308d0a671d13b31508fb043399d045&feed_id=11',
    // G line
    'https://crossorigin.me/http://datamine.mta.info/mta_esi.php?key=19308d0a671d13b31508fb043399d045&feed_id=31',
    // J Z lines
    'https://crossorigin.me/http://datamine.mta.info/mta_esi.php?key=19308d0a671d13b31508fb043399d045&feed_id=36',
    // 7 Line
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
  console.log(`requesting ${req.url}`);
  request(req, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      updateTime();
      const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(body);
      store.setupTrains(parseFeed(feed));
    } else {
      console.log(error);
      // setup a condition to break out of loop
      window.setTimeout(() => requestMta(store, req), 3000);
    }
  });
}
