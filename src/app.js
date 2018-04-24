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

    this.update = this.update.bind(this);
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
      // train is not assigned a route hence no instance of the train is made
      if (!feed[trainId].feedRoute || !feed[trainId].vehicleTime) {

      // create a new train object if new vehicleUpdate and tripUpdate
      // data is received but does not exist in the store
      } else if (!this.trains[trainId]) {
        setTimeout(() => {
          this.setupTrain(trainId, feed[trainId]);
        }, 0);

      // if the train instance already exist in the store, update the train
      // with new set of data received
      } else if (this.trains[trainId]) {
        console.log('update train');
        // this.trains[trainId].update(feed[trainId]);
      }
    });
  }

  setupTrain(trainId, feed) {
    const train = this.makeTrain(trainId, feed);
    train.marker.addTo(this.map);
    this.trains[train.line] = Object.assign({},
      this.trains[train.line],
      { [trainId]: train }
    );
    this.setListener(train);
    train.marker.start();
  }

  makeTrain(trainId, feed) {
    const id = trainId.split(".");
    const line = id[0].split("_").slice(-1)[0];
    const direction = id.slice(-1)[0][0];
    const route = this.routes[line];
    return new Train(trainId, line, direction, route, feed);
  }

  setListener(train) {
    train.marker.addEventListener('end', () => this.update(train.getAction()));
  }

  update(action) {
    switch (action.type) {
      case 'delete':
        setTimeout(() => this.deleteTrain(action.line, action.id), 60000);
        break;

      case 'update':
        this.trains[action.line][action.id].updatePath();
        this.trains[action.line][action.id].marker.start();
        break;

      case 'countdown':
        const startTime = this.trains[action.line][action.id].feedRoute[0].time;
        const updateTime = this.trains[action.line][action.id].updateTime;
        const countdown = startTime - updateTime;
        setTimeout(() => {
          train.updatePath();
          train.marker.start();
        }, countdown);
        break;

      case 'A':
        this.trains[action.line][action.id].marker.bindPopup('REROUTE');
        break;
    }
  }

  deleteTrain(line, id) {
    this.trains[line][id].marker.remove();
    delete this.trains[line][id];
  }

  // updateTrain(train) {
  //   if (train.status === 'idle') {
  //     train.marker.setOpacity(.4);
  //     setTimeout(() => this.deleteTrain(train), 60000);
  //
  //   } else if (train.status === 'standby') {
  //     const countdown = train.route[0].time - new Date();
  //     setTimeout(() => {
  //       train.status = 'active';
  //       train.marker.remove();
  //       train.setMarker();
  //       this.updateTrain(train);
  //     }, countdown);
  //
  //   } else if (train.status === 'reroute') {
  //     this.deleteTrain(train);
  //
  //   } else if (train.status === 'active') {
  //     train.marker.start();
  //   }
  // }

}
