import trainIcons from '../assets/train_icons';
import { getStationById, getLatLng } from '../util/data_utils';
import { getVelocity, timeRatio, interpolate } from '../util/train_utils';

export default class Train {
  constructor(map, feed, trainId) {
    this.trainLabel = trainId[7];


    // vehicleTime state of train
    this.stops;
    this.vehicleTime;
    this.prevStationTime;
    this.nextStationTime;
    this.prevStation;
    this.nextStation;
    this.status;

    // estimated state of train
    this.marker = null;
    this.startPos;
    this.nextPos;
    this.velocity = [0, 0];

    this.initialize(map, feed);
  }

  initialize(map, feed) {
    this.setTrainState(feed);
    this.setRenderState();
    this.setVelocity();
    this.setMarker(map);
  }

  update(feed) {
    this.setTrainState(feed);
    this.updateRenderState();
    this.updateVelocity();
  }

  setTrainState(feed) {
    this.stops = feed.tripUpdate.stopTimeUpdate;
    this.vehicleTime = feed.vehicle ? feed.vehicle.timestamp : 0;

    let previousStop;
    let nextStop;
    for (let i = 0; i < this.stops.length; i++) {
      const stop = this.stops[i];
      if (stop.departure && this.vehicleTime >= stop.departure.time) {
        previousStop = stop;
      } else if (stop.arrival && this.vehicleTime <= stop.arrival.time) {
        nextStop = stop;
        break;
      }
    }

    // add train delays if vehicleTime is << current time(new Date)

    if (!previousStop && nextStop) {
      this.nextStationTime = nextStop.arrival.time;
      this.prevStation = getStationById(nextStop.stopId);
      this.nextStation = this.prevStation;
      this.status = "idle";
    } else if (previousStop && nextStop) {
      this.prevStationTime = previousStop.departure.time;
      this.nextStationTime = nextStop.arrival.time;
      this.prevStation = getStationById(previousStop.stopId);
      this.nextStation = getStationById(nextStop.stopId);
      this.status = "inTransit";
    } else if (previousStop && !nextStop) {
      this.prevStationTime = previousStop.arrival.time;
      this.prevStation = getStationById(previousStop.stopId);
      this.nextStation = this.prevStation;
      this.status = "lastStop"
    } else if (!previousStop && !nextStop) {
      this.prevStationTime = this.stops[0].arrival.time;
      this.prevStation = getStationById(this.stops[0].stopId);
      this.nextStation = this.prevStation;
      this.status = "idle"
    }
  }

  setRenderState() {
    let vehicleTimePos;
    if (this.status === "inTransit") {
      const from = getLatLng(this.prevStation);
      const to = getLatLng(this.nextStation);
      const tr = timeRatio(this.prevStationTime, this.nextStationTime)
      if (tr >= 0) {
        vehicleTimePos = interpolate(from, to, tr);
      } else {
        vehicleTimePos = to;
      }
      this.nextPos = to;
    } else if (this.status === "lastStop" || this.status === "idle") {
      vehicleTimePos = getLatLng(this.prevStation);
    }
    this.startPos = vehicleTimePos;
  }

  setVelocity() {
    if (this.status === "inTransit") {
      const newVelocity = getVelocity(this.nextPos, this.startPos, this.nextStationTime);
      this.velocity = [newVelocity[0], newVelocity[1]];
    }
  }

  setMarker(map) {
    this.marker = new google.maps.Marker({
      position: {
        lat: this.startPos.lat,
        lng: this.startPos.lng
      },
      map: map,
      icon: {
        url: trainIcons[this.trainLabel],
        scaledSize: new google.maps.Size(20, 20)
      }
    });
  }

  updateRenderState() {
    this.nextPos = getLatLng(this.nextStation);
  }

  updateVelocity() {
    // if (this.status === "inTransit") {
    const newVelocity = getVelocity(this.nextPos, this.startPos, this.nextStationTime);
    this.velocity = [newVelocity[0], newVelocity[1]];
    // }
    // else if (this.status === "lastStop" && this.nextPos === this.startPos) {
    //   const newVelocity = getVelocity(this.nextPos, this.startPos, this.nextStationTime);
    //   this.velocity = [(this.velocity[0] + newVelocity[0]), (this.velocity[1] + newVelocity[1])];
    // }
  }
  // if ((this.status === "idle" || this.status === "lastStop") && markerPosition === this.nextPos) {
  //   this.velocity = [0, 0];
  // const markerPosition = (this.marker) ? this.marker.getPosition().toJSON() : null;

  step(timeDelta) {
    // timeDelta is number of milliseconds since last move
    // if the computer is busy the time delta will be larger
    // velocity of object is how far it should move in 1/60th of a second
    if (this.status != "inTransit") return;
    const velocityScale = timeDelta / (1000 / 60);
    const offsetLat = this.velocity[0] * velocityScale;
    const offsetLng = this.velocity[1] * velocityScale;
    const mapLat = this.marker.getPosition().toJSON().lat + offsetLat;
    const mapLng = this.marker.getPosition().toJSON().lng + offsetLng;
    const stepPosition = { lat: mapLat, lng: mapLng };
    this.marker.setPosition(stepPosition);
  }
}
