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

export function mergeRoutes(staticRoute, feedRoute) {
  let route = staticRoute;
  feedRoute.forEach((station) => {
    let stationFound = false;
    for (let i = 0; i < route.length; i++) {
      if (station.id === route[i].id) {
        stationFound = true;
        route[i].time = station.time;
        break;
      }
    }
    if (!stationFound) route = mergeStation(route, staticRoute, station);
  })
  return route;
}

function mergeStation(route, staticRoute, station) {
  console.log('merging station');
  return route;
}
