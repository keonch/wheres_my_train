import stations from '../data/stations';

export function parseFeed(feed) {
  const trains = [];
  console.log(feed);
  feed.entity.forEach((e) => {
    if (withinManhattan(e)) trains.push(e);
  });
  return trains;
};

function withinManhattan(train) {
  if (!train.tripUpdate) return false;

  // Check if current destination is within manhattan
  const latestDestination = train.tripUpdate.stopTimeUpdate[train.tripUpdate.stopTimeUpdate.length - 1].stopId.slice(0, -1);
  const stationIds = stations.map(station => station.stop_id);
  return stationIds.includes(latestDestination);
}

export function updateAll(trains) {
  const newState = trains.reduce(function(acc, cur) {
    acc[cur.id] = cur;
    return acc;
  }, {});
  console.log(newState);
}

// TODO SETUP updateAll FUNCTION AND withinManhattan
