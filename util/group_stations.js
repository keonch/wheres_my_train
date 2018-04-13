import stations from '../data/stations.json';

export function groupStations() {
  const groupedStations = {};
  Object.keys(stations).forEach((stop_id) => {
    const stationName = stations[stop_id].stop_name;
    stop_id = stop_id.slice(0, 3);
    if (groupedStations[stationName]) {
      groupedStations[stationName].add(stop_id);
    } else {
      groupedStations[stationName] = new Set();
      groupedStations[stationName].add(stop_id);
    }
  })
  return groupedStations;
};
