import Train from '../src/train2';
import trainColors from '../assets/train_colors.json';
import stations from '../data/stations.json';
import subwayRoutes from '../data/subway_routes.json';

export default class Store {
  constructor(map) {
    this.state = {
      map: map,
      trains: {},
      routes: {},
      polylines: {}
    }
    this.setupStaticRoutes();
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
    this.setupPolylines();
  }

  setupPolylines() {
    Object.keys(this.state.routes).forEach((line) => {
      const route = this.state.routes[line];
      const color = trainColors[line].trainColor;
      const polyline = new L.Polyline(route, {
        color: color,
        weight: 1.5,
        opacity: 0.8,
        smoothFactor: 1
      });
      this.state.polylines[line] = polyline;
      polyline.addTo(this.state.map);
    });
  }

  // invoked when received 200 response
  setupTrains(feed) {
    const latestFeedTrainId = Object.keys(feed).forEach((trainId) => {
      // if train feed does not include vehicleUpdate OR tripUpdate the
      // train is not assigned a route hence no instance of the train is made
      if (!(feed[trainId].tripUpdate) || (!feed[trainId].vehicle)) {
        return;

        // create a new train object if new vehicleUpdate and tripUpdate
        // data is received but does not exist in the store
      } else if (!this.state.trains[trainId] && trainId[7] !== 'H') {
        const train = new Train(feed[trainId]);
        if (train.status === 'inTransit') {
          const path = this.getPath(train);
          const t = Math.floor(train.timeDifference / path.length);
          train.createMarker(path, t);
        }
        this.state.trains[trainId] = train;
        // if the train instance already exist in the store, update the train
        // with new set of data received
        // } else if (this.state.trains[trainId]) {
        //   this.state.trains[trainId].update(feed[trainId]);

        if (this.state.trains[trainId].marker) {
          this.state.trains[trainId].marker.addTo(this.state.map);
        }
      }
    });
  }

  getPath(train) {
    const route = this.state.routes[train.label];
    const path = [];

    if (train.direction === 'S') {
      for (let i = 0; i < route.length; i++) {
        if (route[i].id === train.prevStop) {
          path.push([route[i].lat, route[i].lng]);
          let j = i + 1;
          while (j < route.length) {
            path.push([route[j].lat, route[j].lng]);
            if (route[j].id === train.nextStop) break;
            j++;
          }
          break;
        }
      }
    } else if (train.direction === 'N') {
      for (let i = route.length - 1; i >= 0; i--) {
        if (route[i].id === train.prevStop) {
          path.push([route[i].lat, route[i].lng]);
          let j = i - 1;
          while (j >= 0) {
            path.push([route[j].lat, route[j].lng]);
            if (route[j].id === train.nextStop) break;
            j--;
          }
          break;
        }
      }
    }
    return path;
  }
}
