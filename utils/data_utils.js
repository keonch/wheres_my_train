import stations from '../data/stations.json';
import { DoublyLinkedList } from './linked_list';

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
    const stationEntity = feedStation.arrival || feedStation.departure;
    if (!stationEntity) return;
    const stationTime = stationEntity.time * 1000;
    const stationId = feedStation.stopId.slice(0, -1);
    const stationLatLng = getStationLatLng(stationId);
    if (!stationLatLng) return;
    return {
      id: stationId,
      lat: stationLatLng.lat,
      lng: stationLatLng.lng,
      time: stationTime
    }
  })
}

function getStationLatLng(stationId) {
  if (!stations[stationId]) return;
  return {
    lat: stations[stationId].lat,
    lng: stations[stationId].lng
  }
}

export function mergeRoutes(staticRoute, feedRoute) {
  const linkedListRoute = createLinkedList(staticRoute);
  const hshRoute = {};

  let node = linkedListRoute.head;
  while (node) {
    hshRoute[node.data.id] = node;
    node = node.next;
  }

  const offRoute = [];

  feedRoute.forEach((station) => {
    if (hshRoute[station.id]) {
      hshRoute[station.id].data.time = station.time;
      offRoute.forEach((offStation) => {

      });
    } else {
      offRoute.push(station);
    }
  });
  // // create route from shallow dup of the staticRoute
  // let route = staticRoute.map(station => ({...station}));
  //
  // // create hash map of stations to keep track of stations in route
  // const stations = {};
  // staticRoute.forEach((station, idx) => {
  //   stations[station.id] = idx;
  // });
  //
  // const offRoute = [];
  //
  // let prevCheckedIndex = null;
  // let insertionCounter = 0;
  //
  // feedRoute.forEach((station) => {
  //   if (stations[station.id]) {
  //     route[stations[station.id]].time = station.time;
  //     prevCheckedIndex = stations[station.id] + insertionCounter;
  //
  //   } else {
  //     offRoute.push(station);
  //
  //     // // if the last stop on the static route has been matched,
  //     // // any feed stations preceding it is pushed onto the route array
  //     // if (prevCheckedIndex === route.length) {
  //     //   route.push(station);
  //     //   prevCheckedIndex++;
  //     //   insertionCounter++;
  //     //
  //     // } else if (prevCheckedIndex === null) {
  //     //
  //     // } else {
  //     //   for (let i = prevCheckedIndex; i < route.length - 1; i++) {
  //     //     const prevStation = route[i];
  //     //     const nextStation = route[i + 1];
  //     //     const dPrevNext = getDistance(prevStation, nextStation);
  //     //     const dPrevCurrent = getDistance(prevStation, station);
  //     //     const dNextCurrent = getDistance(nextStation, station);
  //     //     // if (dPrevCurrent < dPrevNext && dNextCurrent < dPrevNext) {
  //     //     //   route.splice(prevCheckedIndex, 0, station);
  //     //     //   prevCheckedIndex = i + 1;
  //     //     //   insertionCounter++;
  //     //     //   i++
  //     //     // }
  //     //   }
  //     // }
  //   }
  // });
}

function getDistance(s1, s2) {
  const s1LatLng = getStationLatLng(s1.id);
  const s2LatLng = getStationLatLng(s2.id);
  const lat = s1LatLng.lat - s2LatLng.lat;
  const lng = s1LatLng.lng - s2LatLng.lng;
  const d = Math.sqrt(lat * lat + lng * lng);
  return d;
}

function createLinkedList(route) {
  const linkedListRoute = new DoublyLinkedList();
  route.forEach((station) => {
    linkedListRoute.add(station);
  })
  return linkedListRoute;
}
