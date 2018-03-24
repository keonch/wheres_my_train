import { stations } from './stations';

export const initMap = () => {
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
  populate(stations);
}

export const updateMap = () => {

}

function populate(s) {
  console.log(s)
}
