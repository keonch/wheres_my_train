// =========================== this.status ============================
// standby => train is waiting to leave its origin station
// idle => train has reached its last stop (last stop on feed routes)
// active => train is currently in transit
// ====================================================================

import trainIcons from '../assets/train_icons.json';
import { getLatLng } from '../utils/train_utils';
import { parseFeedRoute, mergeRoutes, filterRoute } from '../utils/data_utils';

export default class Train {
  constructor(id, line, direction, route, feed) {
    this.id = id;
    this.line = line;
    this.direction = direction;
    this.originTime = id.split(".")[0].split("_")[0];
    this.updateTime = (new Date()).getTime();
    this.route = this.setRoute(route, feed.feedRoute);
    this.status = this.setStatus();
    this.marker = this.createMarker();
  }

  setRoute(route, feed) {
    const staticRoute = this.setStaticRoute(route);
    const feedRoute = parseFeedRoute(feed);
    const mergedRoute = mergeRoutes(staticRoute, feedRoute);
    const abc = [];
    mergedRoute.traverse((node) => {
      abc.push(node.data);
    })
    console.log(abc);
    return filterRoute(mergedRoute, this.updateTime);
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
    const firstStop = this.route.head.data;
    const abc = [];
    this.route.traverse((node) => {
      abc.push(node.data);
    })
    console.log(abc);
    if (firstStop.time > 0) {
      return 'standby';
    } else if (this.route.tail.data.time < this.updateTime) {
      return 'idle';
    } else {
      return 'active';
    }
  }

  createMarker() {
    let path;
    let duration;

    switch (this.status) {
      case 'active':
      path = this.getPath();
      duration = this.nextStop.data.time - this.updateTime;
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

  getPath() {
    let node = this.route.head;
    while (node.next) {
      if (node.next.data.time > this.updateTime) {
        this.nextStop = node.next;
        this.prevStop = node;
        return [getLatLng(this.prevStop.data), getLatLng(this.nextStop.data)];
      }
      node = node.next;
    }
    return null;
  }

  setNextPath() {
    if (!this.nextStop.next) {
      this.status = 'idle';
      this.duration = 0;
      this.marker.addLatLng(getLatLng(this.nextStop.data), this.duration);
      return;
    }

    this.prevStop = this.nextStop;
    this.nextStop = this.nextStop.next;

    const path = [];
    while (!this.nextStop.data.time) {
      path.push(getLatLng(this.nextStop.data));
      if (!this.nextStop.next) {
        this.status = 'idle at non-last stop';
        this.duration = 0;
        this.marker.addLatLng(getLatLng(this.nextStop.data), this.duration);
        return;
      } else {
        this.nextStop = this.nextStop.next;
      }
    }
    this.duration = this.nextStop.data.time - this.updateTime - this.duration;
  }
}
