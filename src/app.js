import Train from '../src/train';
import staticRoutes from '../data/static_routes.json';
import trainColors from '../assets/train_colors.json';
import { setupToggle } from './setup';

export default class App {
  constructor(map) {
    this.map = map;
    this.trains = {};
    this.polylines = {};

    this.setupPolylines();

    this.updateTrain = this.updateTrain.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  setupPolylines() {
    Object.keys(staticRoutes).forEach((line) => {
      this.polylines[line] = new L.Polyline(staticRoutes[line], {
        color: '#545454',
        weight: 2,
        opacity: 0.8,
        smoothFactor: 1
      })
      this.polylines[line].addTo(this.map);
    });
  }

  setupFeed(feed) {
    Object.keys(feed).forEach((trainId) => {
      // if train feed does not include tripUpdate or vehicleUpdate the
      // train is not assigned a route: no instance of the train is made
      if (!feed[trainId].feedRoute || !feed[trainId].vehicleTime) {

      // create a new train object if new vehicleUpdate and tripUpdate
      // data is received but does not exist in the store
      } else if (!this.trains[trainId]) {
        setTimeout(() => {
          this.makeTrain(trainId, feed[trainId]);
        }, 0);

      // if the train instance already exist in the store,
      // update the train with new set of data received
      } else if (this.trains[trainId]) {
      }
    });
  }

  makeTrain(trainId, feed) {
    const id = trainId.split(".");
    const line = id[0].split("_").slice(-1)[0];
    const direction = id.slice(-1)[0][0];
    const route = staticRoutes[line];
    const train = new Train(trainId, line, direction, route, feed);

    train.marker.addTo(this.map);
    if (!this.trains[line]) setupToggle(line, this.toggle);

    this.trains[line] = Object.assign({},
      this.trains[line],
      { [trainId]: train }
    );
    train.marker.addEventListener('end', () => this.updateTrain(train));
    train.marker.start();
  }

  updateTrain(train) {
    switch (train.status) {
      case 'active':
        train.setNextPath();
        train.marker.start();
        break;

      case 'standby':
        const countdown = train.route.head.data.time - train.updateTime;
        setTimeout(() => {
          train.setNextPath();
          train.marker.start();
        }, countdown);
        break;

      case 'idle':
        setTimeout(() => this.deleteTrain(train), 60000);
        break;

      default:
        train.marker.bindPopup('Rerouting');
        break;
    }
  }

  deleteTrain(train) {
    train.marker.remove();
    delete this.trains[train.line][train.id];
  }

  toggle(line) {
    this.toggleTrain(line);
    this.togglePolyline(line);
  }

  toggleTrain(line) {
    if (!this.trains[line].toggled) {
      this.trains[line].toggled = true;
      Object.keys(this.trains[line]).forEach((trainId) => {
        if (trainId !== 'toggled') {
          this.trains[line][trainId].marker.setOpacity(1);
        }
      });
    }
  }

  togglePolyline(line) {
    if (!this.polylines[line].toggled) {
      this.polylines[line].setStyle({
        opacity: 1,
        color: trainColors[line],
        weight: 3,
        zIndex: 2
      });
    }
  }
}
