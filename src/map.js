import stations from '../data/stations.json';

export async function initMap() {
  const map = L.map(document.getElementById('map')).setView([40.7, -73.96], 12);
  L.tileLayer('https://api.mapbox.com/styles/v1/keonch91/cjgv02cqs00022rmj8wzkifa6/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2VvbmNoOTEiLCJhIjoiY2pmeWxlYXJtMWp3dzJxbjEzN2ZuMmtyeSJ9.bRpTj14kt1-MvRzLZOwEzg', {
    maxZoom: 18
  }).addTo(map);
  return map;
}
