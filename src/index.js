import { initMap } from './map';
import { fetchMtaData } from './mta';
import { setupTrainIcons } from './page_setup';
import Store from '../store/store';

document.addEventListener('DOMContentLoaded', () => {
  const map = initMap();
  const store = new Store(map);
  store.start();
  fetchMtaData(store);
  // const fetch = setInterval(() => fetchMtaData(store), 20000);
  window.store = store;
  window.fetchMtaData = fetchMtaData;
  setupTrainIcons(store.state);
});
