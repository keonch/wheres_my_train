import stations from '../data/stations';

export function initMap() {
  return new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.77, lng: -73.97},
    zoom: 12.5,
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
        stylers: [{color: '#f5f5f5'}]
      },
      {
        featureType: 'transit.line',
        elementType: 'geometry',
        stylers: [{color: '#e5e5e5'}]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{color: '#c9c9c9'}]
      }
    ]
  });
}

export function setupStations(map) {
  return new google.maps.Polyline({
    path: [
      {lat: stations[0].stop_lat, lng: stations[0].stop_lon},
      {lat: stations[1].stop_lat, lng: stations[1].stop_lon}
      // {lat: stations[2].stop_lat, lng: stations[2].stop_lon},
      // {lat: stations[3].stop_lat, lng: stations[3].stop_lon},
      // {lat: stations[4].stop_lat, lng: stations[4].stop_lon},
      // {lat: stations[5].stop_lat, lng: stations[5].stop_lon},
      // {lat: stations[6].stop_lat, lng: stations[6].stop_lon},
      // {lat: stations[7].stop_lat, lng: stations[7].stop_lon},
      // {lat: stations[8].stop_lat, lng: stations[8].stop_lon},
      // {lat: stations[9].stop_lat, lng: stations[9].stop_lon},
      // {lat: stations[10].stop_lat, lng: stations[10].stop_lon},
      // {lat: stations[11].stop_lat, lng: stations[11].stop_lon}
    ],
    icons: [],
    strokeColor: '#ffa500',
    strokeWeight: 1,
    map: map
  });
}
