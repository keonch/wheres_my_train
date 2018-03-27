import { initMap } from './map';
import { requestMta } from './request_mta';
import Store from '../store/store';

function initialize() {
  const map = initMap();
  window.store = new Store(map);
  // setInterval(() => requestMta(store), 30000);
  window.requestMta = requestMta;
}

export default initialize;
