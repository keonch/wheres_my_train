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
        this.state.trains[trainId].update(feed[trainId]);
      }
    });
  }

  start() {
    // start the animation
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    const timeDelta = time - this.lastTime;

    Object.keys(this.state.trains).forEach((trainId) => {
      this.state.trains[trainId].step(timeDelta);
    });
    this.lastTime = time;

    requestAnimationFrame(this.animate.bind(this));
  }
}
