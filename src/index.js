import Train from './train';
import { initMap } from './map';
import { requestMta } from './request_mta';
import stations from '../data/stations';

import store from '../store/trains';

document.addEventListener('DOMContentLoaded', () => {
  const map = initMap();

  setInterval(requestMta(), 30000);

  const train1 = new Train(map, stations[0]);
  const train2 = new Train(map, stations[1]);
  window.train1 = train1;
  window.store = store;
});
