import stations from '../data/stations';

export function parseFeed(feed) {
  let trainFeeds = {};
  feed.entity.forEach((e) => {
    let tripId;
    if (e.vehicle) {
      tripId = e.vehicle.trip.tripId;
      trainFeeds[tripId] = Object.assign({}, trainFeeds[tripId],{vehicle: e.vehicle});
    } else if (e.tripUpdate) {
      tripId = e.tripUpdate.trip.tripId;
      trainFeeds[tripId] = Object.assign({}, trainFeeds[tripId],{tripUpdate: e.tripUpdate});
    }
  });
  return trainFeeds;
};

export function getStationById(stationId) {
  let station = stations[stationId];

  // placeholder station
  if (station === undefined) station = {"stop_id": 101, "stop_name": "Van Cortlandt Park - 242 St", "stop_lat": 40.889248, "stop_lon": -73.898583, "location_type": 1};
  return station;
}

export function getLatLng(station) {
  return { lat: station.stop_lat, lng: station.stop_lon };
}
