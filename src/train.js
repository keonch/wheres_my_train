import { timeArrival, dist } from '../util/train_utils';

export default class Train {
  constructor(map, station) {
    this.image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
    this.marker = new google.maps.Marker({
      position: {lat: station.stop_lat, lng: station.stop_lon},
      map: map,
      icon: this.image
    });
    this.position = this.marker.getPosition().toJSON();
    this.destination = {
      arrivalTime: null,
      location: {}
    };
  }

  setDestination(toStation) {
    this.destination = {
      arrivalTime: 1522015341,
      location: {lat: toStation.stop_lat, lng: toStation.stop_lon}
    }
  }

  move(toPosition) {
    this.marker.setPosition(toPosition)
  }

  something() {
    const d = dist(this.position, this.destination.location);
    const t = timeArrival(this.destination.arrivalTime);
    const speed = (d / t);
    return speed;
  }

  // if (this.position !== toPosition) {
  //   const interpolatedPosition = interpolate(this.position, toPosition, timeOfArrival)
  //   setTimeout(this.move(toPosition, arrivalTime)), 2000);
  // }
}
