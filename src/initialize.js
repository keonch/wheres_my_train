import { initMap } from './map';
import { fetchMtaData } from './mta';
import Store from '../store/store';

function initialize() {
  const map = initMap();
  const store = new Store(map);
  fetchMtaData(store);
  store.start();
  // const fetch = setInterval(() => fetchMtaData(store), 20000);
  window.store = store;
  window.fetchMtaData = fetchMtaData;
  // function stopFetch() {
  //   clearInterval(fetch);
  // }
  // window.stopFetch = stopFetch;
}

export default initialize;
