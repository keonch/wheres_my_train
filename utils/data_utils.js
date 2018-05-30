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
  const hshRoute = new Object();
  let offRoute = [];

  // create a hash from linked list route
  let node = linkedListRoute.head;
  while (node) {
    hshRoute[node.data.id] = node;
    node = node.next;
  }

  feedRoute.forEach((station) => {
    // if station from feed exists within static route, update time data
    if (hshRoute[station.id]) {
      hshRoute[station.id].data.time = station.time;

      // add offRoute stations before this station (only adds after first stop on staticRoute)
      const prevStation = hshRoute[station.id].previous;
      if (prevStation) {
        for (var i = offRoute.length - 1; i === 0; i--) {
          linkedListRoute.insertAfter(offRoute[i], prevStation.data);
        }
        offRoute = [];
      }

      // if station does not exist, add it onto offRoute queue to add onto later
    } else {
      offRoute.push(station);
    }
  });

  return linkedListRoute;
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
    const data = new Object();
    data.id = station.id;
    data.lat = station.lat;
    data.lng = station.lng;
    linkedListRoute.add(data);
  })
  return linkedListRoute;
}

export function filterRoute(route, updateTime) {
  setDurations(route, updateTime);

  let node = route.head;
  let removeNode = true;
  let nodesMissingTime = [];
  let startingNode = null;

  while (node) {
    if (!node.data.time) {
      if (removeNode) {
        startingNode = node;
        route.remove(node.data);
      } else {
        nodesMissingTime.push(node);
      }
    } else {
      if (removeNode) {
        removeNode = false;
        if (node.data.time > 0) {
          route.head = startingNode;
          node.previous = startingNode;
          startingNode.next = node;
        }

      } else if (nodesMissingTime.length > 0) {
        const duration = node.data.time / (nodesMissingTime.length + 1);
        node.data.time = duration;
        nodesMissingTime.forEach((node) => {
          node.data.time = duration;
        })
        nodesMissingTime = [];
        console.log("here");
      }
    }
    node = node.next;
  }

  const qqq = [];
  route.traverse((node) => {
    qqq.push(node.data);
  })
  console.log(qqq);
  return route;
}

// Sets the time it takes for the train to arrive at the station from its previous timed stop
function setDurations(route, updateTime) {
  let totalDuration = 0;
  route.traverse((node) => {
    if (node.data.time) {
      node.data.time -= (updateTime + totalDuration);
      if (node.data.time > 0) {
        totalDuration += node.data.time;
      }
    }
  })
}
