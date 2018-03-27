export function time(dataTimeArrival) {
  const currentTime = new Date();
  const arrivalTime = new Date(dataTimeArrival * 1000)
  const time = (arrivalTime - currentTime);
  return time;
}

export function dist(from, to) {
  const dx = to.lat - from.lat;
  const dy = to.lng - from.lng;
  const dist = Math.sqrt((dx * dx) + (dy * dy));
  return dist;
}

export function setStartPosition() {

}
