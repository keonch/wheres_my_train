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

    if (this.status === 'active') {
      this.marker.addEventListener('end', () => {

      });

    } else if (this.status === 'standby') {
      setTimeout(() => update('from standby'), this.countdown);

    } else if (this.status === 'idle') {
      this.marker.setOpacity(.5);
      const action = {};
      action.type = 'delete';
      action.trainId = this.id;
      action.line = this.line;
      setTimeout(() => update(action), 60000);
    }
  }

  // getMarkerParams() {
  //   if (this.status === 'standby') {
  //     return {
  //       path: [getLatLng(this.route[0]), getLatLng(this.route[0])],
  //       pathTime: [0] }
  //   } else if (this.status === 'idle') {
  //     return {
  //       path: [getLatLng(this.route[this.route.length - 1]), getLatLng(this.route[this.route.length - 1])],
  //       pathTime: [0] }
  //   }
  //   const path = [];
  //   const pathTime = [];
  //   const currentTime = new Date();
  //
  //   let addPath = false;
  //   let durationSum = 0;
  //   const timelessStations = [];
  //
  //   for (let i = 1; i < this.route.length; i++) {
  //     const station = this.route[i];
  //
  //     // begin adding stations when time is ahead of currentTime
  //     if (station.time >= currentTime && !addPath) {
  //       path.push(getLatLng(this.route[i - 1]));
  //       path.push(getLatLng(station));
  //       const duration = station.time - currentTime;
  //       pathTime.push(duration);
  //       durationSum += duration;
  //       addPath = true;
  //
  //       // continue to add stations
  //     } else if (station.time >= currentTime && timelessStations.length === 0) {
  //       path.push(getLatLng(station));
  //       const duration = station.time - currentTime - durationSum;
  //       pathTime.push(duration);
  //       durationSum += duration;
  //
  //       // queue the stations without time to divide duration of the next timed station
  //     } else if (!station.time && addPath) {
  //       timelessStations.push(station);
  //
  //       // if timeless stations are queued before a timed station, divide the duration to each timeless station then push
  //     } else if (station.time >= currentTime && timelessStations.length > 0) {
  //       const duration = station.time - currentTime - durationSum;
  //       const subDurations = duration / (timelessStations.length + 1);
  //       timelessStations.forEach((station) => {
  //         path.push(getLatLng(station));
  //         pathTime.push(subDurations);
  //       });
  //       path.push(getLatLng(station));
  //       pathTime.push(subDurations);
  //       durationSum += duration;
  //     }
  //   }
  //   return { path: path, pathTime: pathTime };
  // }
}
