import initialize from './initialize';
import { requestMta } from './request_mta';
import Train from './train';
import stations from '../data/stations';

document.addEventListener('DOMContentLoaded', () => {
  initialize();

  // setInterval(() => requestMta(), 30000);
  window.requestMta = requestMta;

  const train1 = new Train(window.store.state.map, stations[0]);

  window.train1 = train1;
});
