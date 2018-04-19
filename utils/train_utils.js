export function interpolate(from, to, fromTime, toTime) {
  const r = timeRatio(fromTime, toTime);
  const lat = from.lat + (to.lat - from.lat) * r;
  const lng = from.lng + (to.lng - from.lng) * r;
  return [lat, lng];
}

function timeRatio(fromTime, toTime) {
  const routeTime = toTime - fromTime;
  const currentTime = (toTime) - new Date();
  // if currentTime is negative train has passed the station
  return (currentTime / routeTime);
}

export function getLatLng(station) {
  return [station.lat, station.lng];
}

export function getStationTime(station) {
  const stationEntity = station.arrival || station.departure;
  return stationEntity.time * 1000;
}

// export function getVelocity(toStation, currentPos, timeOfArrival) {
//   const dLat = toStation.lat - currentPos.lat;
//   const dLng = toStation.lng - currentPos.lng;
//   const disp = [dLat, dLng];
//   const t = (timeOfArrival * 1000) - new Date();
//   const v = [(disp[0] / t), (disp[1] / t)];
//   return v;
// }
