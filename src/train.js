import { timeArrival, dist } from '../util/train_utils';

export default class Train {
  constructor(map, station) {
    this.image = 'http://icons.iconarchive.com/icons/icons8/android/32/Transport-Train-icon.png';
    this.marker = new google.maps.Marker({
      position: {lat: station.stop_lat, lng: station.stop_lon},
      map: map,
      icon: {
        url: this.image,
        scaledSize: new google.maps.Size(30, 30)
      }
    });
    this.position = this.marker.getPosition().toJSON();
    this.destination = {};
    this.arrivalTime = null;

    this.upcomingStation = {};
  }

  update(realtimeData) {
    this.destination = {lat: realtimeData.stop_lat, lng: realtimeData.stop_lon};
    this.arrivalTime = realtimeData.arrival;
  }

  move(toPosition) {
    this.marker.setPosition(toPosition)
  }

  something() {
    const d = dist(this.position, this.destination);
    const t = timeArrival(this.arrivalTime);
    const speed = (d / t);
    return speed;
  }

  // if (this.position !== toPosition) {
  //   const interpolatedPosition = interpolate(this.position, toPosition, timeOfArrival)
  //   setTimeout(this.move(toPosition, arrivalTime)), 2000);
  // }
}
