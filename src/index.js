import { initMap } from './map';
import { setupTime, setupTrainIcons, setupToggleButtons } from './page_setup';
import Store from './store';
import { fetchMtaData } from './request_mta';

document.addEventListener('DOMContentLoaded', () => {
  setupTime();
  const map = initMap();
  const store = new Store(map);
  store.start();
  window.store = store;
  window.fetchMtaData = fetchMtaData;
  // const fetch = setInterval(() => fetchMtaData(store), 20000);
  setupTrainIcons(store.state);
  // setupToggleButtons();
});
