import { initMap } from './map';
import { setup } from './setup';

document.addEventListener('DOMContentLoaded', () => {
  initMap().then((map) => setup(map));
});
