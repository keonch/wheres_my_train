import Train from '../src/train';
import { omit } from 'lodash';

export default class Store {
  constructor(map) {
    this.state = {
      map: map,
      trains: {}
    }
  }

  updateTrains(feed) {
    const latestFeedTrainId = Object.keys(feed).map((trainId) => {
      if (!this.state.trains[trainId]) {
        this.state.trains[trainId] = new Train(this.state.map, feed[trainId], trainId);
      } else {
        this.state.trains[trainId].update(feed[trainId]);
      }
      return trainId;
    });
  }

  start() {
    // start the animation
    requestAnimationFrame(this.animate.bind(this));
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
