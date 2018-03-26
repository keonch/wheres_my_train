import { merge } from 'lodash';

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
  }
}
