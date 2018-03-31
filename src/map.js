import stations from '../data/stations';

export function initMap() {
  const map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.7, lng: -73.96},
    zoom: 12,
    styles: [
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "off" }]
      },
      {
        featureType: "water",
        elementType: "labels",
        stylers: [{ visibility: "off" }]
      },
      {
        featureType: "road",
        elementType: "labels",
        stylers: [{ visibility: "off" }]
      },
      {
        elementType: 'geometry',
        stylers: [{color: '#7F7F7F'}]
        // stylers: [{color: '#f5f5f5'}]
      },
      {
        featureType: 'administrative.all',
        elementType: 'labels.text.stroke',
        stylers: [{visibility: "off"}]
      },
      {
        featureType: 'administrative.all',
        elementType: 'labels.text.fill',
        stylers: [{color: '#ffffff'}]
      },
      {
        featureType: 'administrative.neighborhood',
        elementType: 'labels.text.fill',
        stylers: [{visibility: "off"}]
      },
      {
        featureType: 'transit.line',
        elementType: 'geometry',
        stylers: [{color: '#494949'}]
        // stylers: [{ visibility: "off" }]
      },
      {
        featureType: 'transit.station',
        stylers: [{ visibility: "off" }]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        // stylers: [{color: '#c9c9c9'}]
        stylers: [{color: '#062d3f'}]
      }
    ]
  });
  // markStations(map);
  return map;
}

function markStations(map) {
  const image = 'https://cdn3.iconfinder.com/data/icons/map/500/communication-256.png';
  Object.keys(stations).forEach((id) => {
    new google.maps.Marker({
      position: {lat: stations[id].stop_lat, lng: stations[id].stop_lon},
      map: map,
      icon: {
        url: image,
        scaledSize: new google.maps.Size(5, 5)
      }
    });
  })

  // return new google.maps.Polyline({
  //   path: [
  //
  //   ],
  //   icons: [],
  //   strokeColor: '#ffa500',
  //   strokeWeight: 1,
  //   map: map
  // });
}
