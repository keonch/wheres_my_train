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
    const staticRoute = (this.direction === 'S') ? route : Array.from(route).reverse();
    const feedRoute = parseFeedRoute(feed);
    const mergedRoute = mergeRoutes(staticRoute, feedRoute);
    return filterRoute(mergedRoute, this.updateTime);
  }

  setStatus() {
    if (!this.route.head) throw "train was rerouted";
    if (this.route.head.data.time > 0) {
      return 'standby';
    } else if (this.route.tail.data.time < 0) {
      return 'idle';
    } else {
      return 'active';
    }
  }

  createMarker() {
    let path = [];
    let duration = [];

    switch (this.status) {
      case 'active':
      let startQueue = false;
      this.route.traverse((node) => {
        if (node.data.time > 0 && startQueue) {
          path.push(getLatLng(node.data));
          duration.push(node.data.time);
        } else if (node.data.time > 0 && !startQueue) {
          startQueue = true;
          path.push(getLatLng(node.previous.data));
          path.push(getLatLng(node.data));
          duration.push(node.data.time);
        }
      });
      break;

      case 'standby':
      this.route.traverse((node) => {
        if (node === this.route.head) {
          path.push(getLatLng(node.data));
        } else {
          path.push(getLatLng(node.data));
          duration.push(node.data.time);
        }
      });
      break;

      case 'idle':
      const lastStopPos = getLatLng(this.route.tail.data);
      path = [lastStopPos, lastStopPos];
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
    m.setOpacity(.1);
    return m;
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
