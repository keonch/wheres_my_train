import stations from '../data/stations.json';

export function initMap() {
  const map = L.map(document.getElementById('map')).setView([40.7, -73.96], 12);
  L.tileLayer('https://api.mapbox.com/styles/v1/keonch91/cjfytd1j93blb2rodt7by7e31/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2VvbmNoOTEiLCJhIjoiY2pmeWxlYXJtMWp3dzJxbjEzN2ZuMmtyeSJ9.bRpTj14kt1-MvRzLZOwEzg', {
    maxZoom: 18
  }).addTo(map);
  // attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  // id: 'mapbox.streets',
  // accessToken: 'pk.eyJ1Ijoia2VvbmNoOTEiLCJhIjoiY2pmeWxlYXJtMWp3dzJxbjEzN2ZuMmtyeSJ9.bRpTj14kt1-MvRzLZOwEzg'
  return map;
}
