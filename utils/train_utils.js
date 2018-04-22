import stations from '../data/stations.json';

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
        route[i] = Object.assign({}, route[i], { time: station.time });
        break;
      }
    };

    if (!stationFound) {
      const test = stations[station.stopId.slice(0, -1)];
      const idx = mergeStation(route, station);
      const abc = {
        id: station.stopId.slice(0, -1),
        lat: test.lat,
        lng: 'ABCABC',
        time: getStationTime(station)
      };
      route.splice(idx, 0, abc);
    };
  });

  console.log(route);
  return route;
}

function mergeStation(route, station) {
  const idx = 1;
  return idx;
}
