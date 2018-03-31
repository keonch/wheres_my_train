import { trainIcons, trainColors } from '../assets/train';
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
    const trainColor = trainColors[this.trainLabel].trainColor;
    const labelColor = trainColors[this.trainLabel].labelColor;
    const point = new google.maps.Point(30, 16);

    const trainSymbol = {
      path: 'M64 8 Q64 0 56 0 L8 0 Q0 0 0 8 L0 24 Q0 32 6 32 L56 32 Q64 32 64 24 Z',
      rotation: 138,
      strokeColor: '#43464B',
      strokeWeight: 1,
      fillColor: trainColor,
      fillOpacity: 1,
      labelOrigin: point,
      scale: .5
    };

    const trainLabel = {
      text: this.trainLabel,
      color: labelColor,
      fontSize: "12px",
      fontWeight: "700"
    };

    this.marker = new google.maps.Marker({
      position: {
        lat: this.startPos.lat,
        lng: this.startPos.lng
      },
      map: null,
      icon: trainSymbol,
      label: trainLabel
    });
  }

  updateRenderState() {
    this.nextPos = getLatLng(this.nextStation);
  }

  updateVelocity() {
    const newVelocity = getVelocity(this.nextPos, this.marker.getPosition().toJSON(), this.nextStationTime);
    this.velocity = [newVelocity[0], newVelocity[1]];
  }

  setStep(timeDelta) {
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

    this.stepPosition = stepPosition;
  }

  step() {
    this.marker.setPosition(this.stepPosition);
  }

  toggleMarker(map) {
    let toggle;
    if (this.marker.map) {
      toggle = null;
    } else {
      toggle = map;
    }
    this.marker.setMap(toggle);
  }
}
