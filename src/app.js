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

  setupTrains(feed) {
    const latestFeedTrainId = Object.keys(feed).forEach((trainId) => {
      // if train feed does not include tripUpdate the
      // train is not assigned a route hence no instance of the train is made
      if (!feed[trainId].tripUpdate) {
        console.log("unassigned");

      // create a new train object if new vehicleUpdate and tripUpdate
      // data is received but does not exist in the store
      } else if (!this.state.trains[trainId]) {
        const train = new Train(trainId, feed[trainId]);
        this.setMarker(train);
        this.state.trains[trainId] = train;

      // if the train instance already exist in the store, update the train
      // with new set of data received
      // } else if (this.state.trains[trainId]) {
      //   this.state.trains[trainId].update(feed[trainId]);
      }
    });
  }

  // create a marker on map only if train is active
  setMarker(train) {
    const route = this.state.routes[train.line];

    if (train.status !== 'active') return;

    const path = [];
    if (train.direction === 'S') {
      for (let i = 0; i < route.length; i++) {
        if (route[i].id === train.nextStop) {
          path.push([route[i - 1].lat, route[i - 1].lng]);
          path.push([route[i].lat, route[i].lng]);
        }
      }
    } else if (train.direction === 'N') {
      for (let i = route.length - 1; i >= 0; i--) {
        if (route[i].id === train.nextStop) {
          path.push([route[i + 1].lat, route[i + 1].lng]);
          path.push([route[i].lat, route[i].lng]);
        }
      }
    }

    if (path.length === 0) return;

    const t = Math.floor(train.timeDifference / path.length);

    train.createMarker(path, t);
    train.marker.addTo(this.state.map);
    train.startMoving();
    train.marker.on('end', function() {
      train.marker.setOpacity(.5);
    });
  }
}
