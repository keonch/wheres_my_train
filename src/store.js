import Train from '../src/train';
import stations from '../data/stations.json';
import subwayRoutes from '../data/subway_routes.json';
import { fetchMtaData } from './mta';

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
    requestAnimationFrame(this.animate.bind(this));
    fetchMtaData(this);
    this.setupStaticRoutes();
  }

  setupTrains(feed) {
    const latestFeedTrainId = Object.keys(feed).forEach((trainId) => {
      // if train feed does not include vehicleUpdate OR tripUpdate the
      // train is not assigned a route hence no instance of the train is made
      if (!(feed[trainId].tripUpdate) || (!feed[trainId].vehicle)) {
        return;

      // create a new train instance if new vehicleUpdate and tripUpdate
      // data is received but does not exist in the store
      } else if (!this.state.trains[trainId]) {
        const train = new Train(this.state.map, feed[trainId], trainId);
        this.state.trains[trainId] = train;

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
    console.log(this.state.polylines);
  }

  setupPolylines() {
    Object.keys(this.state.routes).forEach((route) => {
      const polylineRoute = new google.maps.Polyline({
        path: this.state.routes[route],
        // icons: [{
        //   icon: lineSymbol,
        //   offset: '100%'
        // }],
        map: this.state.map
      });
      this.state.polylines[route] = polylineRoute;
    });
  }

  animate(time) {
    const timeDelta = time - this.lastTime;

    Object.keys(this.state.trains).forEach((trainId) => {
      this.state.trains[trainId].setStep(timeDelta);
    });

    Object.keys(this.state.trains).forEach((trainId) => {
      this.state.trains[trainId].step();
    });

    this.lastTime = time;

    requestAnimationFrame(this.animate.bind(this));
  }
}
