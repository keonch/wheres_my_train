import Train from '../src/train';
import { fetchMtaData } from './mta';
// import { sortRoute, sortOffRoute } from '../util/data_utils';
import { groupStations } from '../data/group_stations';
import routes from '../data/subway_routes.json';
import stations from '../data/stations';

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
    this.setupRoutes();
  }

  setupTrains(feed) {
    // const feedRoutes = new Set();

    const latestFeedTrainId = Object.keys(feed).forEach((trainId) => {
      // if train feed does not include vehicleUpdate OR tripUpdate the
      // train is not assigned a route hence no instance of the train is made
      if (!(feed[trainId].tripUpdate) || (!feed[trainId].vehicle)) {
        return;

      // create a new train instance if new vehicleUpdate and tripUpdate
      // data is received but does not exist in the store
      } else if (!this.state.trains[trainId]) {
        this.state.trains[trainId] = new Train(this.state.map, feed[trainId], trainId);
        // this.inputRoute(feed[trainId].tripUpdate.stopTimeUpdate, this.state.trains[trainId].trainLabel);

      // if the train instance already exist in the store, update the train
      // with new set of data received
      } else if (this.state.trains[trainId]) {
        this.state.trains[trainId].update(feed[trainId]);
        // this.inputRoute(feed[trainId].tripUpdate.stopTimeUpdate, this.state.trains[trainId].trainLabel);
      } else {
        return;
      }
      // feedRoutes.add(this.state.trains[trainId].trainLabel);
    });
    // this.setupRoutes(feedRoutes);
  }

  // inputRoute(stations, trainLabel) {
  //   if (!this.state.routes[trainLabel]) {
  //     this.state.routes[trainLabel] = {};
  //     this.state.routes[trainLabel].mainRoute = new Set();
  //     this.state.routes[trainLabel].offRoute = new Set();
  //   }
  //
  //   stations.forEach((station) => {
  //     if (station.stopId[0] === trainLabel) {
  //       this.state.routes[trainLabel].mainRoute.add(station.stopId.slice(0, -1));
  //     } else {
  //       this.state.routes[trainLabel].offRoute.add(station.stopId.slice(0, -1));
  //     }
  //   });
  // }
  //
  // setupRoutes(routes) {
  //   routes.forEach((route) => {
  //     this.state.routes[route].mainRoute = sortRoute(this.state.routes[route].mainRoute);
  //     this.state.routes[route].offRoute = sortOffRoute(this.state.routes[route].offRoute)
  //   });
  // }

  setupRoutes() {
    const groupedStations = groupStations();
    console.log(groupedStations);
    Object.keys(routes).forEach((trainLabel) => {
      this.state.routes[trainLabel] = new Set();
      routes[trainLabel].forEach((stationName) => {
        const includedStations = groupedStations[stationName];
        const stationLatLng = this.getStationLatLng(stationName, trainLabel, includedStations);
        this.state.routes[trainLabel].add(stationLatLng);
      });
      this.setupPolylines(trainLabel);
    });
    console.log(this.state.routes);
  }

  getStationLatLng(stationName, trainLabel, includedStations) {
    const latLng = {};
    Object.keys(stations).forEach((stop_id) => {
      if (stations[stop_id].stop_name === stationName && includedStations.has(stop_id)) {
        latLng.lat = stations[stop_id].stop_lat;
        latLng.lng = stations[stop_id].stop_lon;
      }
    })
    console.log(latLng);
    return latLng;
  }

  setupPolylines(trainLabel) {
    this.state.polyLines[trainLabel] = new google.maps.Polyline({
      path: Array.from(this.state.routes[trainLabel]),
      // icons: [{
      //   icon: lineSymbol,
      //   offset: '100%'
      // }],
      map: this.state.map
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
