import initialize from './initialize';
import { requestMta } from './request_mta';
import Train from './train';
import stations from '../data/stations';

document.addEventListener('DOMContentLoaded', () => {
  initialize();

  // setInterval(() => requestMta(), 30000);
  window.requestMta = requestMta;
  const train1 = new Train(window.store.state.map, stations[0]);
  const train2 = new Train(window.store.state.map, stations[1]);
  const train3 = new Train(window.store.state.map, stations[2]);
  const train4 = new Train(window.store.state.map, stations[3]);
  const train5 = new Train(window.store.state.map, stations[4]);
  const train6 = new Train(window.store.state.map, stations[5]);
  const train7 = new Train(window.store.state.map, stations[6]);
  const train8 = new Train(window.store.state.map, stations[7]);
  const train9 = new Train(window.store.state.map, stations[8]);
  const train10 = new Train(window.store.state.map, stations[9]);
  const train11 = new Train(window.store.state.map, stations[10]);
  const train12 = new Train(window.store.state.map, stations[11]);

  window.train1 = train1;
});
