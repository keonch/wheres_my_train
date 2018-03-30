import initialize from './initialize';
import setupTrainIcons from './page_setup';

document.addEventListener('DOMContentLoaded', () => {
  initialize();
  const iconDiv = document.getElementById('train-icons');
  setupTrainIcons(iconDiv);
});
