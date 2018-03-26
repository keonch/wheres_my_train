import {  } from '../train_utils';

export default class Train {
  constructor(map, feed) {
    // this.image = 'http://icons.iconarchive.com/icons/icons8/android/32/Transport-Train-icon.png';
    // this.marker = new google.maps.Marker({
    //   position: {lat: station.stop_lat, lng: station.stop_lon},
    //   map: map,
    //   icon: {
    //     url: this.image,
    //     scaledSize: new google.maps.Size(40, 40)
    //   }
    // });
    // this.position = this.marker.getPosition().toJSON();
  }

  update(feed) {
    console.log(feed);
  }
}
