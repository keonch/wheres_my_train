// =============== this.status ================
// standby => train is at starting station
// inTransit => train is moving
// idle => train has reached its last stop
// ============================================

export default class Train {
  constructor(feed) {
    this.feedRoute = feed.tripUpdate.stopTimeUpdate;
    this.label = feed.vehicle.trip.routeId;
    this.direction = feed.vehicle.trip.tripId[10];
    this.setup();
    // this.createMarker();
  }

  // setup prevStop, nextStop, timeDifference, status
  setup() {
    const currentTime = new Date();
    this.prevStop = this.feedRoute[0].stopId.slice(0, -1);

    // if train has yet arrived at its first stop, it is on standby
    const firstStopTime =
      this.feedRoute[0].arrival ||
      this.feedRoute[0].departure;
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
        this.status = 'inTransit';
        return;
      }
    }

    this.prevStop = this.feedRoute[this.feedRoute.length - 1].stopId.slice(0, -1);
    this.nextStop = null;
    this.status = 'idle'
  }

  createMarker(path, t) {
    if (path.length === 0) {
      console.log(this.label);
      return;
    }
    if (path.length === 0) return;
    // t is the train's travel time between from and to a station (ms)
    // path is an array of stations between FROM and TO destination of a train
    const marker = new L.Marker.movingMarker(path, [t]);

    const trainIcon = L.icon({
      iconUrl: 'assets/images/train.png',
      iconSize: [15, 35],
      iconAnchor: [18, 40]
    });

    marker.setIcon(trainIcon);
    marker.setRotationAngle(20);
    this.marker = marker;
  }
}


// train.marker.addTo(this.state.map);
// train.marker.start();
