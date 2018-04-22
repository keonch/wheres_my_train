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

// export function getStationTime(station) {
//   const stationEntity = station.arrival || station.departure;
//   return stationEntity.time * 1000;
// }

// export function mergeRoutes(staticRoute, feedRoute) {
//   let route = staticRoute;
//
//   feedRoute.forEach((feedStation) => {
//     let isIncluded = false;
//
//     for (let i = 0; i < route.length; i++) {
//       if (feedStation.id === route[i].id) {
//         isIncluded = true;
//         route[i] = Object.assign({}, route[i], { time: feedStation.time });
//         break;
//       }
//     };
//
//     // if (!isIncluded) {
//     //   const station = {};
//     //   station.id = feedStation.id;
//     //   station.lat = stations[feedStation.id].lat;
//     //   station.lng = stations[feedStation.id].lng;
//     //   station.time = feedStation.time;
//     //   route = mergeStation(route, station);
//     // };
//   });
//
//   return route;
// }
//
// function mergeStation(route, station) {
//   let shortest;
//   let secondShortest;
//
//   route.forEach((routeStation) => {
//     const d = getDistance(getLatLng(routeStation), getLatLng(station));
//   });
//
//
// }
//
// function getDistance(station1, station2) {
//   const lat = station1.lat - station2.lat;
//   const lng = station1.lng - station2.lng;
//   return Math.sqrt((lat * lat) + (lng * lng));
// }
