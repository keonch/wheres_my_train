// =============== this.status ================
// standby => train is at starting station
// active => train is currently in transit (has prevStop and nextStop)
// idle => train has reached its last stop
// ============================================

import trainIcons from '../assets/train_icons.json';

export default class Train {
  constructor(id, feed) {
    this.line = id.split(".")[0].split("_").slice(-1)[0];
    this.direction = id.split(".").slice(-1)[0];

    this.setup(feed);
  }

  setup() {
    this.feedRoute = feed.tripUpdate.stopTimeUpdate;
    
    const currentTime = new Date();

    // if train has yet arrived at its first stop, it is on standby
    const firstStopTime = this.feedRoute[0].arrival || this.feedRoute[0].departure;
    if (firstStopTime.time * 1000 > currentTime) {
      this.nextStop = this.feedRoute[0].stopId.slice(0, -1);
      this.status = 'standby'
      return;
    }

    for (let i = 1; i < this.feedRoute.length; i++) {
      const arrivalTime = this.feedRoute[i].arrival.time * 1000;
      if (arrivalTime > currentTime) {
        this.nextStop = this.feedRoute[i].stopId.slice(0, -1);
        this.timeDifference = arrivalTime - currentTime;
        this.status = 'active';
        return;
      }
    }

    this.prevStop = this.feedRoute[this.feedRoute.length - 1].stopId.slice(0, -1);
    this.nextStop = null;
    this.status = 'idle'
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

  startMoving() {
    this.marker.start();
  }
}


// train.marker.addTo(this.state.map);
// train.marker.start();
