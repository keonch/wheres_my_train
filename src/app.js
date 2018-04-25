import Train from '../src/train';
import trainColors from '../assets/train_colors.json';
import stations from '../data/stations.json';
import subwayRoutes from '../data/subway_routes.json';

export default class App {
  constructor(map) {
    this.map = map;
    this.trains = {};
    this.routes = {};
    this.polylines = {};

    this.setupStaticRoutes();
    this.setupPolylines();

    this.update = this.updateTrain.bind(this);
  }

  setupStaticRoutes() {
    Object.keys(subwayRoutes).forEach((line) => {
      const route = [];
      subwayRoutes[line].forEach((stationName) => {
        Object.keys(stations).forEach((stopId) => {
          if (
            stations[stopId].name === stationName &&
            stations[stopId].trains.includes(line)
          ) {
            const stationLatLng = new Object();
            stationLatLng.id = stopId
            stationLatLng.lat = stations[stopId].lat;
            stationLatLng.lng = stations[stopId].lng;
            route.push(stationLatLng);
          }
        });
      });
      this.routes[line] = route;
    });
  }

  setupPolylines() {
    Object.keys(this.routes).forEach((line) => {
      const route = this.routes[line];
      const color = trainColors[line].trainColor;
      const polyline = new L.Polyline(route, {
        color: color,
        weight: 3,
        opacity: 0.8,
        smoothFactor: 1
      });
      this.polylines[line] = polyline;
      polyline.addTo(this.map);
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
        console.log('update train');
        // this.trains[trainId].update(feed[trainId]);
      }
    });
  }

  makeTrain(trainId, feed) {
    const id = trainId.split(".");
    const line = id[0].split("_").slice(-1)[0];
    const direction = id.slice(-1)[0][0];
    const route = this.routes[line];
    const train = new Train(trainId, line, direction, route, feed);

    train.marker.addTo(this.map);
    this.trains[line] = Object.assign({},
      this.trains[line],
      { [trainId]: train }
    );
    // train.marker.addEventListener('end', () => this.updateTrain(train));
    train.marker.start();
  }

  updateTrain(train) {
    switch (train.status) {
      case 'active':
        train.setNextPath();
        train.marker.start();
        break;

      case 'standby':
        const startTime = train.feedRoute[0].time;
        const updateTime = train.updateTime;
        const countdown = startTime - updateTime;
        setTimeout(() => {
          train.setNextPath();
          train.marker.start();
        }, countdown);
        break;

      case 'idle':
        train.marker.setOpacity(.5);
        setTimeout(() => this.deleteTrain(train), 60000);
        break;

      default:
        train.marker.bindPopup('Off Route');
        break;
    }
  }

  deleteTrain(train) {
    train.marker.remove();
    delete this.trains[train.line][train.id];
  }
}
