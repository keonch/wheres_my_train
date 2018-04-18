// =============== this.status ================
// awaiting => train is waiting to leave its origin station
// active => train is currently in transit (has prevStop and nextStop)
// idle => train has reached its last stop
// ============================================

import trainIcons from '../assets/train_icons.json';
import { getLatLng } from '../utils/train_utils';

export default class Train {
  constructor(id) {
    this.line = id.split(".")[0].split("_").slice(-1)[0];
    this.direction = id.split(".").slice(-1)[0][0];
  }

  setup(route, feed) {
    this.staticRoute = this.direction === 'S' ? route : route.reverse();
    this.feedRoute = feed.tripUpdate.stopTimeUpdate;

    switch (this.getFeedCase(feed)) {
      // if train has no vehicle movement, it is at its origin station
      case 'no vehicle':
        this.status = 'standby';
        this.setMarkerAtOrigin();
        break;

      case 'at origin':
        this.vehicleTime = feed.vehicle.timestamp * 1000;
        this.status = 'standby';
        this.setMarkerAtOrigin();
        break;

      case 'at last stop':
        this.vehicleTime = feed.vehicle.timestamp * 1000;
        this.status = 'idle';
        this.setMarkerAtFinal();
        break;

      case 'active':
        this.vehicleTime = feed.vehicle.timestamp * 1000;
        this.status = 'active';
        this.setActiveMarker();
        break;
    }
  }

  getFeedCase(feed) {
    if (!feed.vehicle) return 'no vehicle';
    const feedFirstStopTime =
      this.feedRoute[0].departure ||
      this.feedRoute[0].arrival;
    const feedLastStopTime =
      this.feedRoute[this.feedRoute.length - 1].arrival ||
      this.feedRoute[this.feedRoute.length - 1].departure;
    const vehicleTime = feed.vehicle.timestamp;

    if (vehicleTime <= feedFirstStopTime.time * 1000 && this.feedRoute[0].stopId.slice(0, -1) === this.staticRoute[0].id) {
      return 'at origin';
    } else if (vehicleTime >= feedLastStopTime.time * 1000) {
      return 'at last stop';
    } else {
      return 'active';
    }
  }

  setMarkerAtOrigin() {
    const firstStop = this.staticRoute[0];
    this.createMarker([[firstStop.lat, firstStop.lng], [firstStop.lat, firstStop.lng]], 0);
  }

  setMarkerAtFinal() {
    const lastStop = this.staticRoute[this.staticRoute.length - 1];
    this.createMarker([[lastStop.lat, lastStop.lng], [lastStop.lat, lastStop.lng]], 0);
  }

  setActiveMarker() {
    const path = [];
    for (let i = 0; i < this.feedRoute.length; i++) {
      const station = this.feedRoute[i];
      const stationTime = station.arrival || station.departure;

      if (this.vehicleTime <= stationTime.time * 1000) {
        for (let j = 1; j < this.staticRoute.length; j++) {
          if (this.staticRoute[j].id === station.stopId.slice(0, -1)) {
            this.prevStop = this.staticRoute[j - 1];
            this.nextStop = this.staticRoute[j];
            path.push([this.prevStop.lat, this.prevStop.lng]);
            path.push([this.nextStop.lat, this.nextStop.lng]);
            this.timeDifference = (stationTime.time * 1000) - this.vehicleTime;
            this.createMarker(path, this.timeDifference);
            return;
          }
        }
      }
    }
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

  moveMarker() {
    this.marker.start();
  }
}
