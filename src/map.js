import stations from '../data/stations';

export function initMap() {
  const map = new google.maps.Map(document.getElementById('map'), {
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
      // {
      //   featureType: "transit",
      //   elementType: "labels",
      //   stylers: [{ visibility: "off" }]
      // },
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
        scaledSize: new google.maps.Size(20, 20)
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
