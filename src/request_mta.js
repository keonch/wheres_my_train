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
      updateTime();
      const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(body);
      app.setupFeed(parseFeed(feed));
    } else {
      setTimeout(requestMta(app, req), 10000);
    }
  });
}

// var createCORSRequest = function(method, url) {
//   var xhr = new XMLHttpRequest();
//   if ("withCredentials" in xhr) {
//     // Most browsers.
//     xhr.open(method, url, true);
//   } else if (typeof XDomainRequest != "undefined") {
//     // IE8 & IE9
//     xhr = new XDomainRequest();
//     xhr.open(method, url);
//   } else {
//     // CORS not supported.
//     xhr = null;
//   }
//   return xhr;
// };
//
// var url = '/http://datamine.mta.info/mta_esi.php?key=19308d0a671d13b31508fb043399d045&feed_id=1';
// var method = 'GET';
// export const getData = createCORSRequest(method, url);
//
// getData.onload = function() {
//   // Success code goes here.
// };
//
// getData.onerror = function() {
//   // Error code goes here.
// };
//
// getData.send();
