import Train from '../src/train';

export default class Store {
  constructor(map) {
    this.state = {
      map: map,
      trains: {}
    }
  }

  updateTrains(feed) {
    Object.keys(feed).forEach((trainId) => {
      if (!this.state.trains[trainId]) {
        this.state.trains[trainId] = new Train(this.state.map, feed[trainId]);
      } else {
        this.state.trains[trainId].update(feed[trainId]);
      }
    });
  }
}
