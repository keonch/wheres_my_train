import { getStationById } from '../util/data_utils';
import trainIcons from '../assets/train_icons';

export default class Train {
  constructor(map, feed, trainId) {
    this.trainLabel = trainId[7];

    this.setupTrainFeed(feed);

    this.stops;
    this.realtime;
    this.realtimeFromStation;
    this.realtimeToStation;

    this.marker = new google.maps.Marker({
      position: {lat: this.realtimeFromStation.stop_lat, lng: this.realtimeFromStation.stop_lon},
      map: map,
      icon: {
        url: trainIcons[this.trainLabel],
        scaledSize: new google.maps.Size(10, 10)
      }
    });
    this.markerPosition = this.marker.getPosition().toJSON();
  }

  setupTrainFeed(feed) {
    this.stops = feed.tripUpdate.stopTimeUpdate;
    this.realtime = this.getTimestamp(feed.vehicle);
    this.updateRealtimeStations();
  }

  getTimestamp(vehicleFeed) {
    if (vehicleFeed) {
      return vehicleFeed.timestamp;
    } else {
      return 0;
    }
  }

  updateRealtimeStations() {
    let previousStop;
    let nextStop;
    for (let i = 0; i < this.stops.length; i++) {
      if (this.stops[i].departure && this.realtime >= this.stops[i].departure.time) {
        previousStop = this.stops[i];
      } else if (this.stops[i].arrival && this.realtime <= this.stops[i].arrival.time) {
        nextStop = this.stops[i];
        break;
      }
    }
    if (!previousStop) previousStop = this.stops[0];
    this.realtimeFromStation = getStationById(previousStop.stopId);
    if (nextStop) this.realtimeToStation = getStationById(nextStop.stopId);
  }

  update(feed) {
    this.setupTrainFeed(feed);
  }
}
