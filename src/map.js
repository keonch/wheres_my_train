import stations from '../data/stations.json';

export function initMap() {
  const map = L.map(document.getElementById('map')).setView([40.7, -73.96], 12);
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoia2VvbmNoOTEiLCJhIjoiY2pmeWxlYXJtMWp3dzJxbjEzN2ZuMmtyeSJ9.bRpTj14kt1-MvRzLZOwEzg'
  }).addTo(map);
  return map;
}
