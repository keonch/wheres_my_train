// =============== this.status ================
// standby => train is waiting to leave its origin station
// active => train is currently in transit (has prevStop and nextStop)
// idle => train has reached its last stop
// ============================================

import trainIcons from '../assets/train_icons.json';
import {
  getLatLng
} from '../utils/train_utils';
import {
  parseFeedRoute,
  getStationById
} from '../utils/data_utils';

export default class Train {
  constructor(id, line, direction) {
    this.id = id;
    this.line = line;
    this.direction = direction;
  }

  setup(route, feed) {
    this.staticRoute = this.direction === 'S' ? route : route.reverse();
    this.feedRoute = parseFeedRoute(feed.feedRoute);
    this.vehicleTime = feed.vehicleTime;
    this.updateTime = new Date();
    this.setStatus(feed);

    switch (this.status) {
      case 'standby':
        this.prevStop = this.staticRoute[0];
        this.nextStop = this.staticRoute[0];
        this.countdown = this.feedRoute[0].time - this.updateTime;

        this.createMarker([getLatLng(this.prevStop), getLatLng(this.nextStop)], [0]);
        break;
      case 'idle':
        this.prevStop = getStationById(this.feedRoute[this.feedRoute.length - 1].id);
        this.nextStop = getStationById(this.feedRoute[this.feedRoute.length - 1].id);
        this.createMarker([getLatLng(this.prevStop), getLatLng(this.nextStop)], [0]);
        break;
      case 'active':
        this.setActiveMarker();
        break;
    }
  }

  setStatus(feed) {
    if (this.feedRoute[0].time >= this.updateTime && this.staticRoute[0].id === this.feedRoute[0].id) {
      this.status = 'standby';

    } else if (this.updateTime >= this.feedRoute[this.feedRoute.length - 1].time) {
      this.status = 'idle';

    } else {
      this.status = 'active';
    }
  }

  setActiveMarker() {
    if (this.feedRoute[0].time > this.updateTime) {
      this.generateInitialRoute();
      return;
    }

    const path = [];

    for (let i = 0; i < this.feedRoute.length; i++) {
      const station = this.feedRoute[i];

      if (this.updateTime < station.time) {

        for (let j = 1; j < this.staticRoute.length; j++) {

          if (this.staticRoute[j].id === station.id) {
            this.nextStop = this.staticRoute[j];
            this.prevStop = this.staticRoute[j - 1];
            this.feedRouteIndex = i;
            this.staticRouteIndex = j;

            // implement interpolation
            // const currentPos = interpolate(this.prevStop, this.nextStop, this.vehicleTime, stationTime);

            path.push(getLatLng(this.prevStop));
            path.push(getLatLng(this.nextStop));
            this.duration = station.time - this.updateTime;
            this.createMarker(path, [this.duration]);
            return;
          }
        }
      }
    }

    // placeholder for trains with off routes
    // merge routes
    this.status = 'reroute needed'
    this.marker = new L.Marker.movingMarker([[0,0],[0,0]], [1]);
  }

  generateInitialRoute() {
    this.marker = new L.Marker.movingMarker([[0,0],[0,0]], [1]);
  }

  createMarker(path, t) {
    // t is the train's travel time between from and to a station (ms)
    // path is an array of stations between FROM and TO destination of a train
    const marker = new L.Marker.movingMarker(path, t);
    const trainIcon = L.icon({
      iconUrl: trainIcons[this.line],
      iconSize: [25, 25],
      iconAnchor: [12, 12]
    });
    marker.setIcon(trainIcon);
    this.marker = marker;
  }

// =====================================================================
  getAction() {
    switch (this.status) {
      case 'standby':
        return {
          type: 'countdown',
          id: this.id,
          line: this.line
        }
      case 'idle':
        return {
          type: 'delete',
          id: this.id,
          line: this.line
        }
      case 'active':
        return {
          type: 'update',
          id: this.id,
          line: this.line
        }
      default:
        return {
          type: 'A',
          id: this.id,
          line: this.line
        }
    }
  }

  updatePath() {
    if (
      this.staticRouteIndex === this.staticRoute.length - 1 &&
      this.feedRouteIndex === this.feedRoute.length - 1
    ) {
      this.status = 'idle';
      this.marker.addLatLng(getLatLng(this.nextStop), 0);
      return;
    } else if (
      this.staticRouteIndex !== this.staticRoute.length - 1 &&
      this.feedRouteIndex === this.feedRoute.length - 1
    ) {
      this.status = 'need update';
      this.marker.addLatLng(getLatLng(this.nextStop), 0);
      return;
    } else if (
      this.staticRouteIndex === this.staticRoute.length - 1 &&
      this.feedRouteIndex !== this.feedRoute.length - 1
    ) {
      this.status = 'need reroute';
      this.marker.addLatLng(getLatLng(this.nextStop), 0);
      return;
    }

    for (let i = this.feedRouteIndex + 1; i < this.feedRoute.length; i++) {
      const station = this.feedRoute[i];
      const unmatchedStaticStations = [];

      for (let j = this.staticRouteIndex + 1; j < this.staticRoute.length; j++) {

        if (this.staticRoute[j].id === station.id) {
          const duration = station.time - this.updateTime - this.duration;
          const subduration = duration / (unmatchedStaticStations.length + 1);
          this.duration += duration;
          this.prevStop = this.nextStop;
          this.nextStop = this.staticRoute[j];
          unmatchedStaticStations.forEach((staticStation) => {
            this.marker.addLatLng(getLatLng(staticStation), subduration);
          })
          this.marker.addLatLng(getLatLng(this.nextStop), subduration);
          return;

        } else {
          unmatchedStaticStations.push(this.staticRoute[j]);
        }
      }
      // next station in feedRoute is not found in staticRoute and needs rerouting
      // placeholder for trains with off routes
      this.status = 'reroute needed';
      this.marker.addLatLng(getLatLng(this.nextStop), 0);
      return;
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
