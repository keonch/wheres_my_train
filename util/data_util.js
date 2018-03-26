import stations from '../data/stations';

export function parseFeed(feed) {
  const trains = [];
  feed.entity.forEach((e) => {
    if (withinManhattan(e)) trains.push(e);
  });
  return trains;
};

function withinManhattan(train) {
  if (!train.tripUpdate) return false;

  // Check if most current destination stop is within manhattan
  const latestDestination = train.tripUpdate.stopTimeUpdate[0].stopId.slice(0, -1);
  const stationIds = stations.map(station => station.stop_id);

  return stationIds.includes(latestDestination);
}
