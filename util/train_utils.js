export function timeRatio(timeFrom, timeTo) {
  const routeTime = (timeTo - timeFrom) * 1000;
  const currentTime = (timeTo * 1000) - new Date();
  // if currentTime is negative train has passed the station
  return (currentTime / routeTime);
}

export function dist(from, to) {
  const dx = to.lat - from.lat;
  const dy = to.lng - from.lng;
  const dist = Math.sqrt((dx * dx) + (dy * dy));
  return dist;
}

export function interpolate(from, to, r) {
  const lat = from.lat + (to.lat - from.lat) * r;
  const lng = from.lng + (to.lng - from.lng) * r;
  return { lat: lat, lng: lng };
}
