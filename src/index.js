import { setupTime } from './page_setup';
import { initMap } from './map';
import App from './app';
import { getData } from './request_mta';

document.addEventListener('DOMContentLoaded', () => {
  setupTime();
  const map = initMap();
  const app = new App(map);
  getData(app);
});
