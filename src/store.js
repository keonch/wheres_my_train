import Train from '../src/train';
import { fetchMtaData } from './mta';
// import { sortRoute, sortOffRoute } from '../util/data_utils';
// import { groupStations } from '../data/group_stations';
// import routes from '../data/subway_routes.json';
import stations from '../data/stations';

export default class Store {
  constructor(map) {
    this.state = {
      map: map,
      trains: {},
      routes: {},
      polyLines: {}
    }
  }

  start() {
    requestAnimationFrame(this.animate.bind(this));
    fetchMtaData(this);
  }

  setupTrains(feed) {
    const latestFeedTrainId = Object.keys(feed).forEach((trainId) => {
      // if train feed does not include vehicleUpdate OR tripUpdate the
      // train is not assigned a route hence no instance of the train is made
      if (!(feed[trainId].tripUpdate) || (!feed[trainId].vehicle)) {
        return;

      // create a new train instance if new vehicleUpdate and tripUpdate
      // data is received but does not exist in the store
      } else if (!this.state.trains[trainId]) {
        const train = new Train(this.state.map, feed[trainId], trainId);
        this.state.trains[trainId] = train;
        const stops = feed[trainId].tripUpdate.stopTimeUpdate;
        this.setRoute(train, stops);

      // if the train instance already exist in the store, update the train
      // with new set of data received
      } else if (this.state.trains[trainId]) {
        this.state.trains[trainId].update(feed[trainId]);

      } else {
        return;
      }
    });
    this.createRoutes();
  }

  setRoute(train, stops) {
    const existingRoute = this.state.routes[train.trainLabel];

    if (!existingRoute) {
      this.state.routes[train.trainLabel] = [];
      stops.forEach((stop) => {
        this.state.routes[train.trainLabel].push(stop.stopId.slice(0, 3));
      })
    } else {
      const newRoute = stops.map((stop) => {
        return stop.stopId.slice(0, 3);
      })
      // this.mergeRoutes(existingRoute, newRoute)
    }
  }

  //
  // mergeRoutes(existingRoute, newRoute) {
  //   let mergedRoute;
  //   let newStops;
  //   if (existingRoute.length >== newRoute.length) {
  //     mergedRoute = existingRoute;
  //
  //   } else {
  //     mergedRoute = newRoute;
  //   }
  //
  //   const newStops = existingRoute - newRoute;
  //   if (existingRoute.length == 0) {
  //     return newRoute;
  //   } else if (newRoute.length == 0) {
  //     return existingRoute;
  //   }
  //
  //   console.log(newStops);
  //
  //   newRoute.forEach((stop) => {
  //
  //   });
  // }

  createRoutes() {
    Object.values(this.state.routes).forEach((routeStations) => {
      const route = routeStations.map((stationId) => {
        const latLng = {};
        latLng.lat = stations[stationId].stop_lat;
        latLng.lng = stations[stationId].stop_lon;
        return latLng;
      })
      new google.maps.Polyline({
        path: route,
        // icons: [{
        //   icon: lineSymbol,
        //   offset: '100%'
        // }],
        map: this.state.map
      });
    });
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
