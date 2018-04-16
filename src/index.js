import { initMap } from './map';
import { setupTime, setupTrainIcons, setupToggleButtons } from './page_setup';
import App from './app';
import { fetchMtaData } from './request_mta';

document.addEventListener('DOMContentLoaded', () => {
  setupTime();
  const map = initMap();
  const app = new App(map);
  fetchMtaData(app);

  window.app = app;
  window.fetchMtaData = fetchMtaData;
  // const fetch = setInterval(() => fetchMtaData(app), 20000);
  setupTrainIcons(app.state);
  // setupToggleButtons();

});
