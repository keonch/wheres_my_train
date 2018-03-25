import { initMap } from './map';
import requestMta from './request_mta';
import { createTrain } from '../util/train_utils';

document.addEventListener('DOMContentLoaded', () => {
  const map = initMap();
  createTrain(map);
  window.requestMta = requestMta;
});

// setInterval(requestMta, 31000);
