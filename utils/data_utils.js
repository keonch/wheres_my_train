export function parseFeed(feed) {
  let trainFeeds = {};
  feed.entity.forEach((e) => {
    let tripId;
    if (e.vehicle) {
      tripId = e.vehicle.trip.tripId;
      trainFeeds[tripId] = Object.assign({}, trainFeeds[tripId],{vehicle: e.vehicle});
    } else if (e.tripUpdate) {
      tripId = e.tripUpdate.trip.tripId;
      trainFeeds[tripId] = Object.assign({}, trainFeeds[tripId],{tripUpdate: e.tripUpdate});
    }
  });
  return trainFeeds;
};

export function getFeedCase(feed) {
  if (!feed.vehicle) {
    return 'no vehicle';
  } else if (true) {

  }
}
