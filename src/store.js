import Train from '../src/train';
import stations from '../data/stations.json';
import subwayRoutes from '../data/subway_routes.json';
import { fetchMtaData } from './mta';

import abc from '../data/abc.json';

export default class Store {
  constructor(map) {
    this.state = {
      map: map,
      trains: {},
      routes: {},
      polyLines: {}
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
    
  }

  // setupStaticRoutes() {
  //   Object.keys(subwayRoutes).forEach((route) => {
  //     const subwayRoute = [];
  //     subwayRoutes[route].forEach((stationName) => {
  //       Object.keys(stations).forEach((stationId) => {
  //         if (stationId[0] === route && stations[stationId].name === stationName) {
  //           const stationLatLng = new Object();
  //           stationLatLng.lat = stations[stationId].lat;
  //           stationLatLng.lng = stations[stationId].lng;
  //           subwayRoute.push(stationLatLng);
  //         }
  //       });
  //     });
  //     this.state.routes[route] = subwayRoute;
  //   });
  //   this.setupPolylines();
  // }

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
      this.state.polyLines[route] = polylineRoute;
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
