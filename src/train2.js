export default class Train {
  constructor(feed, polyline) {
    this.feed = feed;
    this.polyline = polyline;

    this.marker = this.createMarker();
  }

  createMarker() {
    const trainIcon = L.icon({
      iconUrl: 'assets/images/train.png',
      iconSize: [22, 49],
      iconAnchor: [18, 40]
    });
    const marker = new L.Marker.movingMarker(this.polyline, [30000]);
    marker.setIcon(trainIcon);
    marker.setRotationAngle(20);
    return marker;
  }
}
