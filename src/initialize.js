import { initMap } from './map';
import { fetchMtaData } from './mta';
import Store from '../store/store';

function initialize() {
  const map = initMap();
  const store = new Store(map);
  store.start();
  fetchMtaData(store);
  setInterval(() => fetchMtaData(store), 20000);
  window.store = store;
  window.fetchMtaData = fetchMtaData;
}

export default initialize;
