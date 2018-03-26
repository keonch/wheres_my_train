import stations from '../data/stations';

export function parseFeed(feed) {
  const trainFeeds = [];
  console.log(feed);
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
