import Train from '../src/train';
import { fetchMtaData } from './mta';
import { sortRoute } from '../util/data_utils';

export default class Store {
  constructor(map) {
    this.state = {
      map: map,
      trains: {},
      routes: {}
    }
  }

  start() {
    requestAnimationFrame(this.animate.bind(this));
    fetchMtaData(this);
  }

  setupTrains(feed) {
    const feedRoutes = new Set();

    const latestFeedTrainId = Object.keys(feed).forEach((trainId) => {
      // if train feed does not include vehicleUpdate OR tripUpdate the
      // train is not assigned a route hence no instance of the train is made
      if (!(feed[trainId].tripUpdate) || (!feed[trainId].vehicle)) {
        return;

      // create a new train instance if new vehicleUpdate and tripUpdate
      // data is received but does not exist in the store
      } else if (!this.state.trains[trainId]) {
        this.state.trains[trainId] = new Train(this.state.map, feed[trainId], trainId);
        this.inputRoute(feed[trainId].tripUpdate.stopTimeUpdate, this.state.trains[trainId].trainLabel);

      // if the train instance already exist in the store, update the train
      // with new set of data received
      } else if (this.state.trains[trainId]) {
        this.state.trains[trainId].update(feed[trainId]);
        this.inputRoute(feed[trainId].tripUpdate.stopTimeUpdate, this.state.trains[trainId].trainLabel);
      }
      feedRoutes.add(this.state.trains[trainId].trainLabel);
    });
    this.setupRoutes(feedRoutes);
  }

  inputRoute(stations, trainLabel) {
    if (!this.state.routes[trainLabel]) {
      this.state.routes[trainLabel] = {};
      this.state.routes[trainLabel].sortedRoutes = new Set();
      this.state.routes[trainLabel].offRoutes = new Set();
    }

    stations.forEach((station) => {
      if (station.stopId[0] === trainLabel) {
        this.state.routes[trainLabel].sortedRoutes.add(station.stopId);
      } else {
        this.state.routes[trainLabel].offRoutes.add(station.stopId);
      }
    });
  }

  setupRoutes(routes) {
    routes.forEach((route) => {
      this.routes[route] = sortRoute(route);
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
