import Train from '../src/train';
import { omit } from 'lodash';
import { fetchMtaData } from './mta';

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
    const latestFeedTrainId = Object.keys(feed).forEach((trainId) => {
      // if train feed does not include vehicleUpdate OR tripUpdate the
      // train is not assigned a route hence no instance of the train is made
      if (!(feed[trainId].tripUpdate) || (!feed[trainId].vehicle)) {
        return;
      // create a new train instance if new vehicleUpdate and tripUpdate
      // data is received but does not exist in the store
      } else if (!this.state.trains[trainId]) {
        this.state.trains[trainId] = new Train(this.state.map, feed[trainId], trainId);
        this.setRoute(feed[trainId].tripUpdate, this.state.trains[trainId].trainLabel);
      // if the train instance already exist in the store, update the train
      // with new set of data received
      } else {
        this.state.trains[trainId].update(feed[trainId]);
      }
    });
  }

  setRoute(tripUpdates, trainLabel) {

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
