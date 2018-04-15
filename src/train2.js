// =============== this.status ================
// standby => train is at starting station
// inTransit => train is moving
// idle => train has reached its last stop
// ============================================

export default class Train {
  constructor(feed) {
    this.feedRoute = feed.tripUpdate.stopTimeUpdate;
    this.staticRoute = staticRoute;
    this.setStops();
    this.createMarker();
  }

  setStops() {
    const currentTime = new Date();
    this.prevStop = feedRoute[0];

    // if train has yet arrived at its first stop, it is on standby
    const firstStopTime =
      this.feedRoute[0].arrival ||
      this.feedRoute[0].departure;
    if (firstStopTime.time > currentTime) {
      this.nextStop = feedRoute[0];
      this.status = 'standby'
      return;
    }

    for (let i = 1; i < this.feedRoute.length; i++) {
      if (this.feedRoute[i].arrival.time > currentTime) {
        this.nextStop = this.feedRoute[i];
        this.status = 'inTransit';
        return;
      }
    }

    this.prevStop = this.feedRoute[this.feedRoute.length - 1];
    this.nextStop = null;
    this.status = 'idle'
  }

  createMarker() {
    // t is the train's travel time between from and to a station (ms)
    // path is an array of stations between FROM and TO destination of a train
    const marker = new L.Marker.movingMarker(path, [t]);

    const trainIcon = L.icon({
      iconUrl: 'assets/images/train.png',
      iconSize: [22, 49],
      iconAnchor: [18, 40]
    });

    marker.setIcon(trainIcon);
    marker.setRotationAngle(20);
    this.marker = marker;
  }
}

// const train = new Train("feed", this.state.polylines['1'].getLatLngs());
// train.marker.addTo(this.state.map);
// train.marker.start();
