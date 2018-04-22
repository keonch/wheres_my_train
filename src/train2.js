// =============== this.status ================
// standby => train is waiting to leave its origin station
// active => train is currently in transit (has prevStop and nextStop)
// idle => train has reached its last stop
// ============================================

import trainIcons from '../assets/train_icons.json';
import {
  interpolate,
  getLatLng,
  getStationTime,
  mergeRoutes
} from '../utils/train_utils';
import { parseFeedRoute } from '../utils/data_utils';

export default class Train {
  constructor(id, line, direction, route, feed) {
    this.id = id;
    this.line = line;
    this.direction = direction;
    this.vehicleTime = feed.vehicleTime;

    // set this.route (merged from static and feed routes)
    this.setRoute(route, feed.feedRoute);

    // set this.status (initial status of train)
    this.setStatus();

    // set this.marker (static or active depending on train status)
    this.setMarker();
  }

  setRoute(route, feedRoute) {
    const staticRoute = this.direction === 'S' ? route : route.reverse();
    const parsedFeedRoute = parseFeedRoute(feedRoute);
    this.route = mergeRoutes(staticRoute, parsedFeedRoute);
  }

  setStatus() {
    const currentTime = new Date();
    if (this.route[0].time >= currentTime) {
      this.status = 'standby';
    } else if (this.route[this.route.length - 1].time <= currentTime) {
      this.status = 'idle';
    } else {
      this.status = 'active';
    }
  }

  setMarker() {
    switch (this.status) {
      case 'standby':
        this.marker = L.Marker(getLatLng(this.route[0]));
        break;
      case 'idle':
        this.marker = L.Marker(getLatLng(this.route[this.route.length - 1]));
        break;
      case 'active':
        const params = this.getMarkerParams();
        this.marker = this.createActiveMarker(params);
        break;
    }
  }

  getMarkerParams() {
    const path = [];
    const pathTime = [];
    const currentTime = new Date();

    let addPath = false;
    for (let i = 1; i < this.route.length; i++) {
      if (this.route[i].time >= currentTime && addPath) {
        path.push(this.route[i].latLng);
      } else if (this.route[i].time >= currentTime) {
        path.push(this.route[i - 1].latLng);
        path.push(this.route[i].latLng);
        addPath = true;
      }
    }
  }

  createActiveMarker(params) {
    // t is the train's travel time between from and to a station (ms)
    // path is an array of stations between FROM and TO destination of a train
    const marker = new L.Marker.movingMarker(params.path, params.pathTime);
    const trainIcon = L.icon({
      iconUrl: trainIcons[this.line],
      iconSize: [25, 25],
      iconAnchor: [12, 12]
    });
    marker.setIcon(trainIcon);
    return marker;
  }

  // const path = [];
  // const currentTime = new Date();
  //
  // for (let i = 0; i < this.feedRoute.length; i++) {
  //   const station = this.feedRoute[i];
  //   const stationTime = getStationTime(station);
  //
  //   if (currentTime < stationTime) {
  //     // this.vehicleTime <= stationTime &&
  //
  //     for (let j = 1; j < this.staticRoute.length; j++) {
  //
  //       if (this.staticRoute[j].id === station.stopId.slice(0, -1)) {
  //         this.nextStop = this.staticRoute[j];
  //         this.prevStop = this.staticRoute[j - 1];
  //
  //         // implement interpolation
  //         // const currentPos = interpolate(this.prevStop, this.nextStop, this.vehicleTime, stationTime);
  //
  //         path.push(getLatLng(this.prevStop));
  //         path.push(getLatLng(this.nextStop));
  //         this.timeDifference = stationTime - currentTime;
  //         this.createMarker(path, this.timeDifference);
  //         return;
  //       }
  //     }
  //   }
  // }
  // placeholder for when train is off static route
  // station has not been found in its staic route
  // use Dijktra's algorithm to determine distances between stations
  // merge it's route with static route
  // this.marker = new L.Marker.movingMarker([[0,0],[0,0]], [1]);
  // this.status = 'reroute';
}
