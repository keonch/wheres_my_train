export function timeRatio(timeFrom, timeTo) {
  const routeTime = (timeTo - timeFrom) * 1000;
  const currentTime = (timeTo * 1000) - new Date();
  // if currentTime is negative train has passed the station
  return (currentTime / routeTime);
}

export function interpolate(from, to, r) {
  const lat = from.lat + (to.lat - from.lat) * r;
  const lng = from.lng + (to.lng - from.lng) * r;
  return { lat: lat, lng: lng };
}

export function getVelocity(toStation, currentPos, timeOfArrival) {
  const dLat = toStation.lat - currentPos.lat;
  const dLng = toStation.lng - currentPos.lng;
  const disp = [dLat, dLng];
  const t = (timeOfArrival * 1000) - new Date();
  const v = [(disp[0] / t), (disp[1] / t)];
  console.log(v);
  return v;
}
