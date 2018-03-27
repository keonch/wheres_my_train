import { initMap } from './map';
import { fetchMtaData } from './mta';
import Store from '../store/store';

function initialize() {
  const map = initMap();
  window.store = new Store(map);
  // setInterval(() => requestMta(store), 30000);
  window.fetchMtaData = fetchMtaData;
}

export default initialize;
