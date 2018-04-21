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

  setupFeed(trainFeeds) {
    trainFeeds.forEach((trainFeed) => {
      if (!this.state.trains[trainFeed.id]) {
        setTimeout(() => this.setTrain(this.createTrain(trainFeed)), 0);

      } else if (this.state.trains[trainId]) {
        console.log('update train');
      }
    });
  }

  createTrain(feed) {
    const id = feed.id;
    const line = id.split(".")[0].split("_").slice(-1)[0];
    const direction = id.split(".").slice(-1)[0][0];
    const route = this.state.routes[line];
    return new Train(id, line, direction, route, feed);
    // this.getTrainById(trainId).marker.addEventListener('end', () => this.updateTrain(train));
    // this.getTrainById(trainId).marker.start();
  }

  setTrain(train) {
    this.state.trains[train.line] = Object.assign({},
      this.state.trains[train.line],
      { [train.id]: train }
    );
    this.state.trains[train.line].marker.addTo(this.state.map);
  }

  updateTrain(train) {
    if (train.status === 'idle') {
      train.marker.setOpacity(.4);
      setTimeout(() => this.deleteTrain(train), 60000);

    } else if (train.status === 'standby') {
      const countdown = train.route[0].time - new Date();
      setTimeout(() => {
        train.status = 'active';
        train.marker.remove();
        train.setMarker();
        this.updateTrain(train);
      }, countdown);

    } else if (train.status === 'reroute') {
      this.deleteTrain(train);

    } else if (train.status === 'active') {
      train.marker.start();
    }
  }

  deleteTrain(train) {
    this.state.trains[train.line][train.id].marker.remove();
    delete this.state.trains[train.line][train.id];
  }
}
