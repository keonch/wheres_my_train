export function parseFeed (feed) {
  console.log(feed);
  feed.entity.forEach((train) => {
    withinManhattan(train);
  });
}

function withinManhattan(train) {

}

function drawLine(map) {
    new google.maps.Polyline({
    path: [fromStation, toStation],
    icons: [{
      icon: lineSymbol,
      offset: '100%'
    }],
    map: map
  });
}
