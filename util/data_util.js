import stations from '../data/stations';

export function parseFeed(feed) {
  const trains = [];
  console.log(feed);
  feed.entity.forEach((e) => {
    if (withinManhattan(e)) trains.push(e);
  });
  console.log(trains);
};

// ADJUST FOR OTHER ROUTES
function withinManhattan(train) {
  if (!train.tripUpdate) return false;

  // Check if most current destination stop is within manhattan
  const latestDestination = train.tripUpdate.stopTimeUpdate[0].stopId.slice(0, -1);
  const stationIds = stations.map(station => station.stop_id);
  return stationIds.includes(latestDestination);
}
