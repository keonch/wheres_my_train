var GtfsRealtimeBindings = require('./gtfs-realtime');
var request = require('request');

var requestSettings = {
  method: 'GET',
  url: 'https://crossorigin.me/http://datamine.mta.info/mta_esi.php?key=19308d0a671d13b31508fb043399d045&feed_id=21',
  encoding: null
};

function requestMta () {
  console.log("ping");
  request(requestSettings, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log("200 ok");
      window.GtfsRealtimeBindings = GtfsRealtimeBindings;
      var feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(body);
      console.log("decoded");
      console.log(feed);
      // feed.entity.forEach(function(entity) {
        // console.log(entity);
        // if (entity.trip_update) {
          // console.log(entity.trip_update);
        // }
      // });
    }
  });
}

export default requestMta;
