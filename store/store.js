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
        this.state.trains[trainId] = new Train(this.state.map, feed[trainId], trainId);
      } else {
        this.state.trains[trainId].setTrainState(feed[trainId]);
      }
    });
  }

  animate(time) {
    const timeDelta = time - this.lastTime;

    Object.keys(this.state.trains).forEach((train) => {
      train.step(timeDelta);
    });
    this.lastTime = time;

    requestAnimationFrame(this.animate.bind(this));
  }
}
