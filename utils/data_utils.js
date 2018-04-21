export function parseFeed(feed) {
  return feed.entity.map((e) => {
    if (e.vehicle && e.tripUpdate) {
      const trainFeed = {};
      trainFeed.id = e.vehicle.trip.tripId;
      trainFeed.feedRoute = e.tripUpdate.stopTimeUpdate;
      trainFeed.vehicleTime = e.vehicle.timestamp * 1000;
      return trainFeed;
    }
  });
};
