import { initMap } from './map';
import Store from '../store/store';

function initialize() {
  const map = initMap();
  window.store = new Store(map);
}

export default initialize;
