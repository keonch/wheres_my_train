// =========================== this.status ============================
// standby => train is waiting to leave its origin station
// idle => train has reached its last stop (last stop on feed routes)
// active => train is currently in transit
// ====================================================================

import trainIcons from '../assets/train_icons.json';
import { getLatLng } from '../utils/train_utils';
import { parseFeedRoute } from '../utils/data_utils';
import { mergeRoutes } from '../utils/data_utils';

export default class Train {
  constructor(id, line, direction, route, feed) {
    this.id = id;
    this.line = line;
    this.direction = direction;
    this.originTime = id.split(".")[0].split("_")[0];
    this.updateTime = new Date();
    this.route = this.setRoute(route, feed.feedRoute);
    this.status = this.setStatus();
    this.marker = this.makeMarker();
  }

  setRoute(route, feed) {
    const staticRoute = this.setStaticRoute(route);
    const feedRoute = parseFeedRoute(feed);
    return mergeRoutes(staticRoute, feedRoute);
  }

  setStaticRoute(route) {
    if (this.direction === 'S') {
      return route;
    } else {
      const r = Array.from(route);
      return r.reverse();
    }
  }

  setStatus() {
    if (this.route.head.data.time > this.updateTime) {
      return 'standby';
    } else if (this.route.tail.data.time < this.updateTime) {
      return 'idle';
    } else {
      return 'active';
    }
  }

  makeMarker() {
    let path;
    let duration;

    switch (this.status) {
      case 'active':
      const activeParams = this.getActiveParams();
      path = activeParams.path;
      duration = activeParams.duration;
      break;

      case 'standby':
      path = [[this.route.head.data.lat, this.route.head.data.lng], [this.route.head.data.lat, this.route.head.data.lng]];
      duration = 0;
      break;

      case 'idle':
      path = [[this.route.tail.data.lat, this.route.tail.data.lng], [this.route.tail.data.lat, this.route.tail.data.lng]];
      duration = 0;
      break;
    }

    const m = new L.Marker.movingMarker(path, duration);
    const trainIcon = L.icon({
      iconUrl: trainIcons[this.line],
      iconSize: [25, 25],
      iconAnchor: [12, 12]
    });
    m.setIcon(trainIcon);
    m.setOpacity(.3);
    return m;
  }

  getActiveParams() {
    const activeParams = {};

    let node = this.route.head;
    while (node.next) {
      if (node.next.data.time > this.updateTime) {
        this.nextStop = node.next;
        this.prevStop = node;
        activeParams.path = [
          getLatLng(this.prevStop.data),
          getLatLng(this.nextStop.data)
        ];
        activeParams.duration = this.nextStop.data.time - this.updateTime;
        break;
      }
      node = node.next;
    }

    return activeParams;
  }

  setNextPath() {
    this.prevStop = this.nextStop;
    this.nextStop = this.nextStop.next;

    
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
    this.status = 'offroute';
    this.marker.addLatLng(getLatLng(nextStop), 0);
    return;
  }
}
