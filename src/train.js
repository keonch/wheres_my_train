// =========================== this.status ============================
// standby => train is waiting to leave its origin station
// idle => train has reached its last stop (last stop on feed routes)
// active => train is currently in transit
// ====================================================================

import trainIcons from '../assets/train_icons.json';
import { getLatLng } from '../utils/train_utils';
import { parseFeedRoute } from '../utils/data_utils';

export default class Train {
  constructor(id, line, direction, route, feed) {
    this.id = id;
    this.line = line;
    this.direction = direction;
    this.originTime = id.split(".")[0].split("_")[0];
    this.updateTime = new Date();

    this.setStaticRoute(route);
    this.feedRoute = parseFeedRoute(feed.feedRoute);

    this.staticRouteIndex = 0;
    this.feedRouteIndex = 0;
    this.durationSum = 0;

    this.setStatus();
    this.makeMarker();
  }

  setStaticRoute(route) {
    if (this.direction === 'S') {
      this.staticRoute = route;

    } else {
      const r = Array.from(route);
      this.staticRoute = r.reverse();
    }
  }

  setStatus() {
    if (this.staticRoute[0].id === this.feedRoute[0].id && this.feedRoute[0].time >= this.updateTime) {
      this.status = 'standby';

    } else if (this.feedRoute[this.feedRoute.length - 1].time <= this.updateTime) {
      this.status = 'idle';

    } else {
      this.status = 'active';
    }
  }

  makeMarker() {
    let params = {};

    switch (this.status) {
      case 'active':
      params = this.getActiveParams(params);
      break;

      case 'standby':
      params.path = [
        getLatLng(this.staticRoute[0]),
        getLatLng(this.staticRoute[0])
      ];
      params.duration = 0;
      break;

      case 'idle':
      params.path = [
        getLatLng(this.feedRoute[this.feedRoute.length - 1]),
        getLatLng(this.feedRoute[this.feedRoute.length - 1])
      ];
      params.duration = 0;
      break;
    }

    this.marker = new L.Marker.movingMarker(params.path, params.duration);
    const trainIcon = L.icon({
      iconUrl: trainIcons[this.line],
      iconSize: [25, 25],
      iconAnchor: [12, 12]
    });
    this.marker.setIcon(trainIcon);
    this.marker.setOpacity(.4);
  }

  getActiveParams(params) {
    if (this.feedRoute[0].time >= this.updateTime) {
      // FIRST FEED ROUTE STATION IS NOT FIRST STATIC ROUTE STATION
      this.status = 'need initialize';
      params.path = [getLatLng(this.feedRoute[0]), getLatLng(this.feedRoute[0])];
      params.duration = [0];
      return params;
    }

    for (let i = 1; i < this.feedRoute.length; i++) {
      if (this.feedRoute[i].time > this.updateTime) {
        const nextStop = this.feedRoute[i];
        const prevStop = this.feedRoute[i-1];
        const path = [getLatLng(prevStop), getLatLng(nextStop)];
        const durations = [];
        const nonMatchingStations = [];
        let startSplice = false;

        for (let j = 0; j < this.staticRoute.length; j++) {
          const staticStation = this.staticRoute[j];
          if (staticStation.id === prevStop.id) {
            startSplice = true;

          } else if (startSplice && staticStation.id === nextStop.id) {
            this.feedRouteIndex = i;
            this.staticRouteIndex = j;
            this.durationSum += nextStop.time - this.updateTime;
            const subduration = this.durationSum / (nonMatchingStations.length + 1);
            durations.push(subduration);

            nonMatchingStations.forEach((station) => {
              path.splice(-1, 0, getLatLng(station));
              durations.push(subduration);
            });
            return { path: path, duration: durations };

          } else if (startSplice) {
            nonMatchingStations.push(staticStation);
          }
        }

        this.status = 'offroute';
        if (startSplice) {
          // next stop is not found in static route
        } else {
          // previous stop is not found in static route
        }
        return { path: path, duration: [0] };
      }
    }
  }

  setNextPath() {
    if (this.feedRouteIndex === this.feedRoute.length - 1) {
      this.status = 'idle';
      const latLng = getLatLng(this.feedRoute[this.feedRouteIndex]);
      this.marker.addLatLng(latLng, 0);
      return;

    } else if (
      this.staticRouteIndex === this.staticRoute.length - 1 &&
      this.feedRouteIndex !== this.feedRoute.length - 1
    ) {
      this.status = 'offroute';
      const latLng = getLatLng(this.feedRoute[this.feedRouteIndex]);
      this.marker.addLatLng(latLng, 0);
      return;
    }

    const nextStop = this.feedRoute[this.feedRouteIndex + 1];
    const unmatchedStaticStations = [];

    for (let i = this.staticRouteIndex + 1; i < this.staticRoute.length; i++) {

      if (this.staticRoute[i].id === nextStop.id) {
        const duration = nextStop.time - this.updateTime - this.durationSum;
        const subduration = duration / (unmatchedStaticStations.length + 1);
        this.durationSum += duration;
        this.staticRouteIndex = i;
        this.feedRouteIndex += 1;
        unmatchedStaticStations.forEach((staticStation) => {
          this.marker.addLatLng(getLatLng(staticStation), subduration);
        })
        this.marker.addLatLng(getLatLng(nextStop), subduration);
        return;

      } else {
        unmatchedStaticStations.push(this.staticRoute[i]);
      }
    }
    // next station in feedRoute is not found in staticRoute and needs rerouting
    // placeholder for trains with off routes
    console.log('station is headed off route');
    this.status = 'offroute';
    this.marker.addLatLng(getLatLng(nextStop), 0);
    return;
  }
}
