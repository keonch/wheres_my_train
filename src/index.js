import Train from './train';
import { initMap } from './map';
import { requestMta } from './request_mta';

import stations from '../data/stations';

document.addEventListener('DOMContentLoaded', () => {
  const map = initMap();
  window.requestMta = requestMta;
  const train1 = new Train(map, stations[0]);
  const train2 = new Train(map, stations[1]);
  // train1.update(stations[1]);
  window.train1 = train1;
});
