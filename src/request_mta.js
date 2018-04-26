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
    testing();
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
function testing() {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
           if (xmlhttp.status == 200) {
              console.log(xmlhttp.responseText);
           }
           else if (xmlhttp.status == 400) {
              console.log('There was an error 400');
           }
           else {
               console.log('something else other than 200 was returned');
           }
        }
    };

    xmlhttp.open("GET", 'http://datamine.mta.info/mta_esi.php?key=19308d0a671d13b31508fb043399d045&feed_id=51', true);
    xmlhttp.send();
}
