import Train from '../src/train';
import staticRoutes from '../data/static_routes.json';
import trainColors from '../assets/train_colors.json';

export default class App {
  constructor(map) {
    this.map = map;
    this.trains = {};
    this.polylines = {};
    this.setupPolylines();

    this.updateTrainIcon = this.updateTrainIcon.bind(this);
  }

  setupPolylines() {
    Object.keys(staticRoutes).forEach((line) => {
      this.polylines[line] = new L.Polyline(staticRoutes[line], {
        color: 'grey',
        // weight: 2,
        opacity: .05
        // smoothFactor: 1
      })
      this.polylines[line].addTo(this.map);
    });
  }

  setupFeed(feed) {
    Object.keys(feed).forEach((trainId) => {
      // if train feed does not include tripUpdate or vehicleUpdate the
      // train is not assigned a route: no instance of the train is made
      if (!feed[trainId].feedRoute || !feed[trainId].vehicleTime) {

      // create a new train object if new vehicleUpdate and tripUpdate
      // data is received but does not exist in the store
      } else if (!this.trains[trainId]) {
        setTimeout(() => {
          this.makeTrain(trainId, feed[trainId]);
        }, 0);

      // if the train instance already exist in the store,
      // update the train with new set of data received
      } else if (this.trains[trainId]) {
      }
    });
  }

  makeTrain(trainId, feed) {
    const id = trainId.split(".");
    const line = id[0].split("_").slice(-1)[0];
    if (line === "H") return;

    const direction = id.slice(-1)[0][0];
    const route = staticRoutes[line];
    const train = new Train(trainId, line, direction, route, feed);

    train.marker.addTo(this.map);
    if (!this.trains[line]) this.updateTrainIcon(line);

    this.trains[line] = Object.assign({},
      this.trains[line],
      { [trainId]: train }
    );

    switch (train.status) {
      case 'active':
      train.marker.start();
      break;

      case 'standby':
      setTimeout(() => {train.marker.start()}, train.route.head.data.time);
      break;

      case 'idle':
      setTimeout(() => this.deleteTrain(train), 60000);
      break;
    }
  }

  deleteTrain(train) {
    train.marker.remove();
    delete this.trains[train.line][train.id];
  }

  updateTrainIcon(line) {
    if (line === "GS") {
      line = "S";
    } else if (line === "SS") {
      line = "SI";
    }

    const trainIcon = document.getElementById(`${line}-train`);
    trainIcon.classList.remove("loading");
    trainIcon.classList.add("loaded");

    trainIcon.addEventListener("click", () => {
      if (trainIcon.classList.contains("toggled")) {
        trainIcon.classList.remove("toggled");
        Object.values(this.trains[line]).forEach((train) => {
          train.marker.setOpacity(.2);
          train.marker.setZIndexOffset(0);
        });
        this.polylines[line].setStyle({
          color: '#545454',
          weight: 2,
          opacity: 0.4,
          smoothFactor: 1
        });
      } else {
        trainIcon.classList.add("toggled");
        Object.values(this.trains[line]).forEach((train) => {
          train.marker.setOpacity(1);
          train.marker.setZIndexOffset(100);
        });
        this.polylines[line].setStyle({
          opacity: 1,
          color: trainColors[line],
          weight: 3
        });
      }
    });
  }
}
