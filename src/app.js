import Train from '../src/train2';
import trainColors from '../assets/train_colors.json';
import stations from '../data/stations.json';
import subwayRoutes from '../data/subway_routes.json';

export default class App {
  constructor(map) {
    this.state = {
      map: map,
      trains: {},
      routes: {},
      polylines: {}
    }
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
      this.state.routes[line] = route;
    });
  }

  setupPolylines() {
    Object.keys(this.state.routes).forEach((line) => {
      const route = this.state.routes[line];
      const color = trainColors[line].trainColor;
      const polyline = new L.Polyline(route, {
        color: color,
        weight: 3,
        opacity: 0.8,
        smoothFactor: 1
      });
      this.state.polylines[line] = polyline;
      polyline.addTo(this.state.map);
    });
  }

  setupFeed(feed) {
    Object.keys(feed).forEach((trainId) => {
      // if train feed does not include tripUpdate or vehicleUpdate the
      // train is not assigned a route hence no instance of the train is made
      if (!feed[trainId].tripUpdate || !feed[trainId].vehicle) {
        console.log("Unassigned");

      // create a new train object if new vehicleUpdate and tripUpdate
      // data is received but does not exist in the store
      } else if (!this.state.trains[trainId]) {
        setTimeout(() => this.createTrain(trainId, feed[trainId]), 0);

      // if the train instance already exist in the store, update the train
      // with new set of data received
      } else if (this.state.trains[trainId]) {
        console.log('update train');
        // this.state.trains[trainId].update(feed[trainId]);
      }
    });
  }

  createTrain(trainId, feed) {
    const id = trainId.split(".");
    const line = id[0].split("_").slice(-1)[0];
    const direction = id.slice(-1)[0][0];
    const route = this.state.routes[line];

    const train = new Train(trainId, line, direction);
    train.setup(route, feed);
    train.marker.addTo(this.state.map);
    train.start(this.update);

    console.log('THIS HAS PASSED THE AWAITRESPONSE');
    this.state.trains[train.line] = Object.assign({},
      this.state.trains[train.line],
      { [trainId]: train }
    );
  }

  update(action) {
    if (action.type === 'delete') {
      console.log(this.state.trains[line]);
      console.log(`deleting ${action.trainId}`);
      delete this.state.trains.line[trainId];
      console.log(this.state.trains[line]);
    } else {
      console.log('not deleted');
    }
  }
}
