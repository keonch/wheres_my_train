import { initMap } from './map';
import { setupTime, setupTrainIcons, setupToggleButtons } from './page_setup';
import Store from './store';
import {groupStations} from '../data/group_stations';

document.addEventListener('DOMContentLoaded', () => {
  setupTime();
  const map = initMap();
  const store = new Store(map);
  store.start();
  // const fetch = setInterval(() => fetchMtaData(store), 20000);
  setupTrainIcons(store.state);
  // setupToggleButtons();
});
