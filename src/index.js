import initMap from './map';
import requestMta from './request_mta';

document.addEventListener('DOMContentLoaded', () => {
  window.initMap = initMap;
  // setInterval(() => console.log("hello"), 5000);
  setInterval(requestMta, 31000);
});
