import Train from '../src/train2';
import trainColors from '../assets/train_colors.json';
import stations from '../data/stations.json';
import subwayRoutes from '../data/subway_routes.json';
import { fetchMtaData } from './request_mta';

export default class Store {
  constructor(map) {
    this.state = {
      map: map,
      trains: {},
      routes: {},
      polylines: {}
    }
  }

  start() {
    this.setupStaticRoutes();
    fetchMtaData(this);
  }

  setupTrains(feed) {
    const latestFeedTrainId = Object.keys(feed).forEach((trainId) => {
      // if train feed does not include vehicleUpdate OR tripUpdate the
      // train is not assigned a route hence no instance of the train is made
      if (!(feed[trainId].tripUpdate) || (!feed[trainId].vehicle)) {
        return;

      // create a new train object if new vehicleUpdate and tripUpdate
      // data is received but does not exist in the store
      } else if (!this.state.trains[trainId]) {
        const train = new Train(feed[trainId]);
        this.state.trains[trainId] = train;
        // this.setIcon(trainId);

      // if the train instance already exist in the store, update the train
      // with new set of data received
      } else if (this.state.trains[trainId]) {
        this.state.trains[trainId].update(feed[trainId]);

      } else {
        return;
      }
    });
  }

  setupStaticRoutes() {
    Object.keys(subwayRoutes).forEach((line) => {
      const route = [];
      subwayRoutes[line].forEach((stationName) => {
        Object.values(stations).forEach((station) => {
          if (station.name === stationName && station.trains.includes(line)) {
            const stationLatLng = new Object();
            stationLatLng.lat = station.lat;
            stationLatLng.lng = station.lng;
            route.push(stationLatLng);
          }
        });
      });
      this.state.routes[line] = route;
    });
    this.setupPolylines();
  }

  setupPolylines() {
    Object.keys(this.state.routes).forEach((line) => {
      const route = this.state.routes[line];
      const trainColor = trainColors[line].trainColor;
      const firstpolyline = new L.Polyline(route, {
        color: trainColor,
        weight: 2,
        opacity: 0.8,
        smoothFactor: 1
      });
      firstpolyline.addTo(this.state.map);
    });
  }

}
