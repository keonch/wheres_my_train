import stations from '../data/stations';

// export default class Map {
//   constructor(){
//     this.map = this.initMap();
//   }
//
//   initMap() {
//     const map = new google.maps.Map(document.getElementById('map'), {
//       center: {lat: 40.77, lng: -73.97},
//       zoom: 12.5,
//       styles: [
//         {
//           featureType: "poi",
//           elementType: "labels",
//           stylers: [{ visibility: "off" }]
//         },
//         {
//           featureType: "water",
//           elementType: "labels",
//           stylers: [{ visibility: "off" }]
//         },
//         {
//           featureType: "road",
//           elementType: "labels",
//           stylers: [{ visibility: "off" }]
//         },
//         {
//           elementType: 'geometry',
//           stylers: [{color: '#f5f5f5'}]
//         },
//         {
//           featureType: 'transit.line',
//           elementType: 'geometry',
//           stylers: [{color: '#e5e5e5'}]
//         },
//         {
//           featureType: 'water',
//           elementType: 'geometry',
//           stylers: [{color: '#c9c9c9'}]
//         }
//       ]
//     });
//     this.setStations(map, stations);
//     this.createLines(map);
//   }
//
//
//     const line = new google.maps.Polyline({
//       path: [{lat: stations[0].stop_lat, lon: station[0].stop_lon}, {lat: stations[1].stop_lat, lon: station[1].stop_lon}],
//       icons: [{
//         icon: "",
//         offset: '100%'
//       }],
//       map: map;
//     });
//   }
// }

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

  const lineSymbol = {
    path: google.maps.SymbolPath.CIRCLE,
    scale: 8,
    strokeColor: '#393'
  };

  const line = new google.maps.Polyline({
    path: [
      {lat: stations[1].stop_lat, lng: stations[1].stop_lon},
      {lat: stations[0].stop_lat, lng: stations[0].stop_lon}
    ],
    icons: [{
      icon: lineSymbol,
      offset: '100%'
    }],
    map: map
  });

  // animateCircle(line);
}

// function animateCircle(line) {
//   var count = 0;
//   window.setInterval(function() {
//     count = (count + 1) % 200;
//
//     var icons = line.get('icons');
//     icons[0].offset = (count / 2) + '%';
//     line.set('icons', icons);
//   }, 20);
// }
