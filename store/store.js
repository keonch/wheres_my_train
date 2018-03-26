import { merge } from 'lodash';
import Train from '../src/train';
import { getStation } from '../util/data_utils';

export default class Store {
  constructor(map) {
    this.state = {
      map: map,
      trains: {}
    }
  }

  updateTrains(newFeed) {
    const feedObj = newFeed.reduce(function(acc, cur) {
      acc[cur.id] = cur;
      return acc;
    }, {});
    this.state.trains = merge({}, this.state.trains, newFeed);
    this.setupTrains();
  }

  setupTrains() {
    Object.keys(this.state.trains).forEach((id) => {
      const train = this.state.trains[id];

      if (!train.trainClass) {
        const station = getStation(train);
        new Train(this.state.map, station);
      }

      
    });
  }
}
