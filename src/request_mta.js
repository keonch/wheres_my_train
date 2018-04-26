import request from 'request';
import urls from '../data/urls.json';
import GtfsRealtimeBindings from '../gtfs-realtime';
import { parseFeed } from '../utils/data_utils';
import { updateTime } from './page_setup';

export function getData(app) {
  urls.forEach((url) => {
    const req = {
      method: 'GET',
      url: url,
      encoding: null
    };
    // requestMta(app, req);
    makeCorsRequest();
  })
}

// function requestMta(app, req) {
//   request(req, function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//       updateTime();
//       const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(body);
//       app.setupFeed(parseFeed(feed));
//     } else {
//       requestMta(app, req);
//     }
//   });
// }
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}

// Helper method to parse the title tag from the response.
function getTitle(text) {
  return text.match('<title>(.*)?</title>')[1];
}

// Make the actual CORS request.
function makeCorsRequest() {
  // This is a sample server that supports CORS.
  var url = 'http://datamine.mta.info/mta_esi.php?key=19308d0a671d13b31508fb043399d045&feed_id=51';

  var xhr = createCORSRequest('GET', url);
  if (!xhr) {
    alert('CORS not supported');
    return;
  }

  // Response handlers.
  xhr.onload = function() {
    var text = xhr.responseText;
    var title = getTitle(text);
    console.log(text);
    alert('Response from CORS request to ' + url + ': ' + title);
  };

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  xhr.send();
}
