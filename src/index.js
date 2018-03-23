import initMap from './map';
import requestMta from './request_mta';

document.addEventListener('DOMContentLoaded', () => {
  window.initMap = initMap;
  // setInterval(requestMta, 31000);
  window.requestMta = requestMta;
});
