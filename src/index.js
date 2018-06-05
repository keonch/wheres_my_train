import { initMap } from './map';
import { getData, test } from './request_mta';
import { setupTime, setupControls } from './setup';
import App from './app';

document.addEventListener('DOMContentLoaded', () => {
  setupTime();
  const map = initMap();
  const app = new App(map);
  setupControls(app).then(setTimeout(() => getData(app), 1000));
});
