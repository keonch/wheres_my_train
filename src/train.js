// =========================== this.status ============================
// standby => train is waiting to leave its origin station
// idle => train has reached its last stop
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
    this.staticRoute = this.direction === 'S' ? route : route.reverse();
    this.feedRoute = parseFeedRoute(feed.feedRoute);
    this.staticRouteIndex = 0;
    this.feedRouteIndex = 0;
    this.path = [];
    this.durations = [];
    this.marker;
    this.setStatus();
    this.setMarker();
  }

  setStatus() {
    if (this.staticRoute[0].id === this.feedRoute[0].id && this.feedRoute[0].time >= this.updateTime) {
      this.status = 'standby';

    } else if (this.updateTime >= this.feedRoute[this.feedRoute.length - 1].time) {
      this.status = 'idle';

    } else {
      this.status = 'active';
    }
  }

  setMarker() {
    this.setParams();
    this.marker = this.makeMarker();
  }

  setParams() {
    switch (this.status) {
      case 'active':
        this.setActiveParams();
        break;

      case 'standby':
        this.path.push(getLatLng(this.staticRoute[0]));
        this.path.push(getLatLng(this.staticRoute[0]));
        this.durations.push(0);
        break;

      case 'idle':
        const lastFeedStation = getStationById(this.feedRoute[this.feedRoute.length - 1].id);
        this.path.push(getLatLng(lastFeedStation));
        this.path.push(getLatLng(lastFeedStation));
        this.durations.push(0);
        break;
    }
  }

  setActiveParams() {
    for (let i = 0; i < this.feedRoute.length; i++) {
      const feedStation = this.feedRoute[i];

      if (feedStation.time > this.updateTime) {

        for (let j = 1; j < this.staticRoute.length; j++) {

          if (this.staticRoute[j].id === feedStation.id) {
            this.feedRouteIndex = i;
            this.staticRouteIndex = j;
            this.path.push(getLatLng(this.staticRoute[j-1]));
            this.path.push(getLatLng(this.staticRoute[j]));
            this.durations.push(feedStation.time - this.updateTime);
            return;
          }
        }

        // station from feed is not found in its static route therefore
        // it is off route
        this.status = 'offroute';
        const offrouteStation = getStationById(feedStation.id);
        this.path.push(getLatLng(offrouteStation));
        this.path.push(getLatLng(offrouteStation));
        this.durations.push(0);
        return;
      }
    }
  }

  makeMarker() {
    const marker = new L.Marker.movingMarker(this.path, this.durations);
    const trainIcon = L.icon({
      iconUrl: trainIcons[this.line],
      iconSize: [25, 25],
      iconAnchor: [12, 12]
    });
    marker.setIcon(trainIcon);
    return marker;
  }

  update() {
    if (this.feedRouteIndex === this.feedRoute.length - 1) {
      console.log('reached its last stop');
      this.status = 'idle';
      const finalStop = this.feedRoute[this.feedRouteIndex];
      const finalStopLatLng = getLatLng(getStationById(finalStop.id));
      this.marker.addLatLng(finalStopLatLng), 0);
      return;

    } else if (
      this.staticRouteIndex === this.staticRoute.length - 1 &&
      this.feedRouteIndex !== this.feedRoute.length - 1
    ) {
      console.log('last stop is off route');
      this.status = 'offroute';
      const nextStop = this.feedRoute[this.feedRouteIndex];
      const nextStopLatLng = getLatLng(getStationById(nextStop.id));
      this.marker.addLatLng(nextStopLatLng, 0);
      return;
    }

    const nextStop = this.feedRoute[this.feedRouteIndex + 1];
    const unmatchedStaticStations = [];

    for (let i = this.staticRouteIndex + 1; j < this.staticRoute.length; j++) {

      if (this.staticRoute[j].id === nextStop.id) {
        const duration = nextStop.time - this.updateTime - this.duration;
        const subduration = duration / (unmatchedStaticStations.length + 1);
        this.duration += duration;
        this.prevStop = this.nextStop;
        this.nextStop = this.staticRoute[j];
        unmatchedStaticStations.forEach((staticStation) => {
          this.marker.addLatLng(getLatLng(staticStation), subduration);
        })
        this.marker.addLatLng(getLatLng(this.nextStop), subduration);
        return;

      } else {
        unmatchedStaticStations.push(this.staticRoute[j]);
      }
    }
    // next station in feedRoute is not found in staticRoute and needs rerouting
    // placeholder for trains with off routes
    this.status = 'offroute';
    this.marker.addLatLng(getLatLng(this.nextStop), 0);
    return;
  }
}
