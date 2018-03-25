import { initMap } from './map';
import requestMta from './request_mta';

document.addEventListener('DOMContentLoaded', () => {
  const map = initMap();
  window.requestMta = requestMta;
});

// setInterval(requestMta, 31000);
