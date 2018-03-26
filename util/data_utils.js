import stations from '../data/stations';

export function parseFeed(feed) {
  const trainFeeds = [];
  feed.entity.forEach((e) => {
    if (withinManhattan(e)) trainFeeds.push(e);
  });
  return trainFeeds;
};

function withinManhattan(train) {
  if (!train.tripUpdate) return false;

  // Check if current destination is within manhattan
  const latestDestination = train.tripUpdate.stopTimeUpdate[train.tripUpdate.stopTimeUpdate.length - 1].stopId.slice(0, -1);
  const stationIds = stations.map(station => station.stop_id);
  return stationIds.includes(latestDestination);
}

export function getStation(train) {
  const stationId = train.tripUpdate.stopTimeUpdate.slice(-1)[0].stopId.slice(0, -1);
  const station = stations.find((station) => {
    return station.stop_id == stationId
  })
  return station
}
