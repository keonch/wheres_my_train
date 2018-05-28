import request from 'request';
import urls from '../data/urls.json';
import GtfsRealtimeBindings from '../gtfs-realtime';
import { parseFeed } from '../utils/data_utils';
import { updateTime } from './setup';

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
      // TODO
      // updateTime();
      const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(body);
      app.setupFeed(parseFeed(feed));
    } else {
      setTimeout(requestMta(app, req), 10000);
    }
  });
}
