import initMap from './map';
import requestMta from './request_mta';

document.addEventListener('DOMContentLoaded', () => {
  window.initMap = initMap;
  window.requestMta = requestMta;
  // setInterval(requestMta, 31000);
});
