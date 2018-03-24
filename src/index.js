import { initMap } from './map';
import requestMta from './request_mta';
// import

document.addEventListener('DOMContentLoaded', () => {
  initMap();
  window.requestMta = requestMta;
  // setInterval(requestMta, 31000);

});
