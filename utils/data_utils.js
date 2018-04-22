import stations from '../data/stations.json';

export function parseFeed(feed) {
  let trainFeeds = {};
  feed.entity.forEach((e) => {
    let tripId;
    if (e.vehicle) {
      tripId = e.vehicle.trip.tripId;
      trainFeeds[tripId] = Object.assign({}, trainFeeds[tripId],{vehicleTime: e.vehicle.timestamp * 1000});
    } else if (e.tripUpdate) {
      tripId = e.tripUpdate.trip.tripId;
      trainFeeds[tripId] = Object.assign({}, trainFeeds[tripId],{feedRoute: e.tripUpdate.stopTimeUpdate});
    }
  });
  return trainFeeds;
};

export function parseFeedRoute(feedRoute) {
  return feedRoute.map((feedStation) => {
    const stationTime = feedStation.arrival || feedStation.departure;
    return {
      id: feedStation.stopId.slice(0, -1),
      time: stationTime.time * 1000
    }
  })
};

export function getStationById(stationId) {
  return {
    id: stationId,
    lat: stations[stationId].lat,
    lng: stations[stationId].lng
  }
}
