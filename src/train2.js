// =============== this.status ================
// awaiting => train is waiting to leave its origin station
// active => train is currently in transit (has prevStop and nextStop)
// idle => train has reached its last stop
// ============================================

import trainIcons from '../assets/train_icons.json';

export default class Train {
  constructor(id) {
    this.line = id.split(".")[0].split("_").slice(-1)[0];
    this.direction = id.split(".").slice(-1)[0][0];
  }

  async setup(route, feed) {
    this.staticRoute = this.direction === 'S' ? route : route.reverse();
    this.feedRoute = feed.tripUpdate.stopTimeUpdate;

    switch (this.getFeedCase(feed)) {
      // if train has no vehicle movement, it is at its origin station
      case 'no vehicle':
        this.setAwaiting();
        break;

      case 'at origin':
        this.setAwaiting();
        break;

      case ''
      default:
    }
  }

  getFeedCase(feed) {
    if (!feed.vehicle) return 'no vehicle';

    const firstStopTime = this.feedRoute[0].arrival || this.feedRoute[0].departure;
    const vehicleTime = feed.vehicle.timestamp;
    if (
      firstStopTime.time * 1000 >= vehicleTime &&
      this.feedRoute[0].stopId.slice(0, -1) === this.staticRoute[0].id
    ) {
      return 'at origin';
    }

    
  }

    for (let i = 0; i < this.feedRoute.length; i++) {
      let arrivalTime;
      if (i === 0) {
        arrivalTime = firstStopTime.time * 1000;
      } else {
        arrivalTime = this.feedRoute[i].arrival.time * 1000;
      }

      if (arrivalTime > this.vehicleTime) {
        this.nextStop = this.feedRoute[i].stopId.slice(0, -1);
        this.timeDifference = arrivalTime - currentTime;
        return this.setActive();
      }
    }
  }

  setAwaiting() {
    const station = this.staticRoute[0];
    this.marker = this.createMarker([station.lat, station.lng], 0);
    this.status = 'awaiting';
  }

  setActive() {
    const path = [];
    for (let i = 0; i < this.staticRoute.length; i++) {
      if (this.staticRoute[i].id === this.nextStop) {

      }
    }
    this.marker = this.createMarker(path, this.timeDifference);
    this.status = 'active';
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
    return marker;
  }

  startMoving() {
    this.marker.start();
  }
}
