export function toggleTrains(trainLabel, state) {
  console.log("ToggleTrains");
  Object.keys(state.trains).forEach((trainId) => {
    const train = store.state.trains[trainId];
    if (train.trainLabel === trainLabel) train.toggleMarker(state.map);
  });
}
