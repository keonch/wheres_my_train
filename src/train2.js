// =============== this.status ================
// standby => train is waiting to leave its origin station
// active => train is currently in transit (has prevStop and nextStop)
// idle => train has reached its last stop
// ============================================

import trainIcons from '../assets/train_icons.json';
import {
  interpolate,
  getLatLng,
  getStationTime
} from '../utils/train_utils';

export default class Train {
  constructor(id, line, direction) {
    this.id = id;
    this.line = line;
    this.direction = direction;
  }

  setup(route, feed) {
    this.staticRoute = this.direction === 'S' ? route : route.reverse();
    this.feedRoute = feed.tripUpdate.stopTimeUpdate;
    this.vehicleTime = feed.vehicle.timestamp * 1000;
    this.setStatus(feed);

    switch (this.status) {
      case 'standby':
        this.prevStop = this.staticRoute[0];
        this.nextStop = this.staticRoute[0];
        this.createMarker([getLatLng(this.prevStop), getLatLng(this.nextStop)], 1);
        break;
      case 'idle':
        this.prevStop = this.staticRoute[this.staticRoute.length - 1];
        this.nextStop = this.staticRoute[this.staticRoute.length - 1];
        this.createMarker([getLatLng(this.prevStop), getLatLng(this.nextStop)], 1);
        break;
      case 'active':
        this.setActiveMarker();
        break;
    }
  }

  setStatus(feed) {
    const firstStationTime = getStationTime(this.feedRoute[0]);
    const lastStationTime = getStationTime(this.feedRoute[this.feedRoute.length - 1]);
    const currentTime = new Date();

    if (
      firstStationTime >= currentTime &&
      this.staticRoute[0].id === this.feedRoute[0].stopId.slice(0, -1)
    ) {
      this.countdown = firstStationTime - currentTime;
      this.status = 'standby';

    } else if (
      this.vehicleTime >= lastStationTime ||
      currentTime >= lastStationTime
    ) {
      this.status = 'idle';

    } else {
      this.status = 'active';
    }
  }

  setActiveMarker() {
    const currentTime = new Date();

    if (getStationTime(this.feedRoute[0]) > currentTime) {
      this.generateInitialRoute();
      return;
    }
// =====================================================================
    const path = [];

    for (let i = 0; i < this.feedRoute.length; i++) {
      const station = this.feedRoute[i];
      const stationTime = getStationTime(station);

      if (currentTime < stationTime) {
        // this.vehicleTime <= stationTime &&

        for (let j = 1; j < this.staticRoute.length; j++) {

          if (this.staticRoute[j].id === station.stopId.slice(0, -1)) {
            this.nextStop = this.staticRoute[j];
            this.prevStop = this.staticRoute[j - 1];

            // implement interpolation
            // const currentPos = interpolate(this.prevStop, this.nextStop, this.vehicleTime, stationTime);

            path.push(getLatLng(this.prevStop));
            path.push(getLatLng(this.nextStop));
            this.timeDifference = stationTime - currentTime;
            this.createMarker(path, this.timeDifference);
            return;
          }
        }
      }
    }

    // placeholder for when train is off static route
    // station has not been found in its staic route
    // use Dijktra's algorithm to determine distances between stations
    // merge it's route with static route
    this.marker = new L.Marker.movingMarker([[0,0],[0,0]], [1]);
    this.status = 'reroute';
  }

  generateInitialRoute() {
    this.marker = new L.Marker.movingMarker([[0,0],[0,0]], [1]);
  }

  createMarker(path, t) {
    // t is the train's travel time between from and to a station (ms)
    // path is an array of stations between FROM and TO destination of a train
    const marker = new L.Marker.movingMarker(path, [t]);
    const trainIcon = L.icon({
      iconUrl: trainIcons[this.line],
      iconSize: [25, 25],
      iconAnchor: [12, 12]
    });
    marker.setIcon(trainIcon);
    this.marker = marker;
  }

  start(update) {
    this.marker.start();
    const action = {};

    if (this.status === 'active') {
      this.marker.addEventListener('end', () => {

      });

    } else if (this.status === 'standby') {
      action.type = 'standby';
      action.trainId = this.id;
      action.line = this.line;
      setTimeout(() => update('from standby'), this.countdown);

    } else if (this.status === 'idle') {
      this.marker.setOpacity(.5);
      action.type = 'delete';
      action.trainId = this.id;
      action.line = this.line;
      setTimeout(() => update(action), 60000);
    }
  }
}
