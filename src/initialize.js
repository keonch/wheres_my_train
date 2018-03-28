import { initMap } from './map';
import { fetchMtaData } from './mta';
import Store from '../store/store';

function initialize() {
  const map = initMap();
  const store = new Store(map);
  window.store = store;
  window.fetchMtaData = fetchMtaData;
  fetchMtaData(store);
}

export default initialize;
