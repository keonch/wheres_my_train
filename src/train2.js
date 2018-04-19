// =============== this.status ================
// standby => train is waiting to leave its origin station
// active => train is currently in transit (has prevStop and nextStop)
// idle => train has reached its last stop
// ============================================

import trainIcons from '../assets/train_icons.json';
import { interpolate } from '../utils/train_utils';
import { getLatLng, getStationTime } from '../utils/train_utils';

export default class Train {
  constructor(line, direction) {
    this.line = line;
    this.direction = direction;
  }

  setup(route, feed) {
    this.staticRoute = this.direction === 'S' ? route : route.reverse();
    this.feedRoute = feed.tripUpdate.stopTimeUpdate;

    this.setStatus(feed);

    switch (this.status) {
      case 'standby':
        this.nextStop = this.staticRoute[0];
        this.createMarker([getLatLng(this.nextStop)], 0);
        break;
      case 'idle':
        this.setMarkerAtFinal();
        break;
      case 'active':
        this.setActiveMarker();
        break;
    }

    return this;
  }

  setStatus(feed) {
    // if train has no vehicle movement, it is at its origin station
    if (!feed.vehicle) this.status = 'standby';

    this.vehicleTime = feed.vehicle.timestamp * 1000;

    const firstStationTime = getStationTime(this.feedRoute[0]);
    const lastStationTime = getStationTime(this.feedRoute[this.feedRoute.length - 1]);

    if (
      this.vehicleTime <= firstStationTime &&
      this.feedRoute[0].stopId.slice(0, -1) === this.staticRoute[0].id
    ) {
      this.nextStop = this.staticRoute[0];
      this.countdown = firstStationTime - new Date();
      return 'at origin';

    } else if (this.vehicleTime >= lastStationTime) {
      return 'at last stop';

    } else {
      return 'active';
    }
  }

  setMarkerAtOrigin() {
  }

  setMarkerAtFinal() {
    const lastStop = this.staticRoute[this.staticRoute.length - 1];
    this.createMarker([[lastStop.lat, lastStop.lng], [lastStop.lat, lastStop.lng]], 0);
  }

  setActiveMarker() {
    const path = [];
    for (let i = 0; i < this.feedRoute.length; i++) {
      const station = this.feedRoute[i];
      const stationEntity = station.arrival || station.departure;
      const stationTime = stationEntity.time * 1000;

      if (this.vehicleTime <= stationTime) {

        for (let j = 1; j < this.staticRoute.length; j++) {

          if (this.staticRoute[j].id === station.stopId.slice(0, -1)) {
            this.prevStop = this.staticRoute[j - 1];
            this.nextStop = this.staticRoute[j];

            // implement interpolation
            // const currentPos = interpolate(this.prevStop, this.nextStop, this.vehicleTime, stationTime);

            path.push([this.prevStop.lat, this.prevStop.lng]);
            path.push([this.nextStop.lat, this.nextStop.lng]);
            this.timeDifference = (stationTime) - this.vehicleTime;
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
    this.marker = new L.Marker.movingMarker([[0,0],[0,0]], [0]);
    this.status = 'reroute';
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

  start() {
    this.marker.start();

    if (this.status === 'active') {
      this.marker.addEventListener('end', () => {
        this.update();
      });

    } else if (this.status === 'standby') {
      this.setCountdown();

    } else if (this.status === 'idle') {
      this.marker.setOpacity(.5);
      setTimeout(() => { this.fire('ended') }, 10000);
    }
  }

  update() {
    console.log('active marker ended');
  };

  setCountdown() {
    const currentTime = new Date();
    const countdown = this.nextStop
  }
}
