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
