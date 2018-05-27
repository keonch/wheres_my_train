import request from 'request';
import urls from '../data/urls.json';
import GtfsRealtimeBindings from '../gtfs-realtime';
import { parseFeed } from '../utils/data_utils';
import { updateTime } from './setup';

import { routing } from '../routing/routing';

export function getData(app) {
  urls.forEach((url) => {
    const req = {
      method: 'GET',
      url: url,
      encoding: null
    };
    requestMta(app, req)
  });
}

function requestMta(app, req) {
  request(req, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      updateTime();
      const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(body);
      app.setupFeed(parseFeed(feed));
    } else {
      setTimeout(requestMta(app, req), 10000);
    }
  });
}

export function test() {
  const req = {
    method: 'GET',
    url: "https://cors-anywhere.herokuapp.com/http://datamine.mta.info/mta_esi.php?key=19308d0a671d13b31508fb043399d045&feed_id=1",
    encoding: null
  };
  request(req, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(body);
      routing(feed);
    } else {
      console.log(error);
    }
  });
}
