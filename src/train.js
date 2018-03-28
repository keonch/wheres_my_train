import trainIcons from '../assets/train_icons';
import { getStationById, getLatLng } from '../util/data_utils';
import { getVelocity, timeRatio, interpolate } from '../util/train_utils';

export default class Train {
  constructor(map, feed, trainId) {
    this.trainLabel = trainId[7];

    this.initialize(feed);

    // realtime state of train
    this.stops;
    this.realtime;
    this.realtimeFromStation;
    this.realtimeToStation;
    this.fromStation;
    this.toStation;
    this.status;

    // estimated state of train
    this.mapFrom;
    this.mapTo;
    this.velocity = [0, 0];

    this.marker = new google.maps.Marker({
      position: {
        lat: this.mapFrom.lat,
        lng: this.mapFrom.lng
      },
      map: map,
      icon: {
        url: trainIcons[this.trainLabel],
        scaledSize: new google.maps.Size(20, 20)
      }
    });
  }

  initialize(feed) {
    this.setTrainState(feed);
    this.setMarkerState();
    this.setVelocity();
  }

  setTrainState(feed) {
    this.stops = feed.tripUpdate.stopTimeUpdate;
    this.realtime = feed.vehicle ? feed.vehicle.timestamp : 0;

    let previousStop;
    let nextStop;
    for (let i = 0; i < this.stops.length; i++) {
      const stop = this.stops[i];
      if (stop.departure && this.realtime >= stop.departure.time) {
        previousStop = stop;
      } else if (stop.arrival && this.realtime <= stop.arrival.time) {
        nextStop = stop;
        break;
      }
    }

    if (!previousStop && nextStop) {
      this.realtimeToStation = nextStop.arrival.time;
      this.fromStation = getStationById(nextStop.stopId);
      this.status = "idle";
    } else if (previousStop && nextStop) {
      this.realtimeFromStation = previousStop.departure.time;
      this.realtimeToStation = nextStop.arrival.time;
      this.fromStation = getStationById(previousStop.stopId);
      this.toStation = getStationById(nextStop.stopId);
      this.status = "inTransit";
    } else if (previousStop && !nextStop) {
      this.realtimeFromStation = previousStop.arrival.time;
      this.fromStation = getStationById(previousStop.stopId);
      this.status = "lastStop"
    } else if (!previousStop && !nextStop) {
      this.realtimeFromStation = this.stops[0].arrival.time;
      this.fromStation = getStationById(this.stops[0].stopId);
      this.status = "idle"
    }
  }

  setMarkerState() {
    let realtimePos;
    let newVelocity;
    if (this.status === "inTransit") {
      const from = getLatLng(this.fromStation);
      const to = getLatLng(this.toStation);
      const tr = timeRatio(this.realtimeFromStation, this.realtimeToStation)
      realtimePos = interpolate(from, to, tr);
    } else if (this.status === "lastStop" || this.status === "idle") {
      realtimePos = getLatLng(this.fromStation);
      newVelocity = [0, 0];
    }
    this.mapFrom = realtimePos;
  }

  setVelocity() {
    newVelocity = getVelocity(to, )
  }

  step(timeDelta) {
    // timeDelta is number of milliseconds since last move
    // if the computer is busy the time delta will be larger
    // velocity of object is how far it should move in 1/60th of a second
    if (this.status != "inTransit") return;
    const velocityScale = timeDelta / (1000 / 60),
      offsetLat = this.velocity[0] * velocityScale,
      offsetLng = this.velocity[1] * velocityScale,
      lat = this.marker.getMarkerPosition() + offsetLat,
      lng = this.marker.getMarkerPosition() + offsetLng,
      stepPosition = { lat: lat, lng: lng }
    this.marker.setPosition(stepPosition);
  }

  getMarkerPosition() {
    return this.marker.getPosition().toJSON();
  }
}
