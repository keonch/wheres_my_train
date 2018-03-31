import { trainIcons } from '../assets/train';

export function setupTime() {
  const clock = document.getElementById('clock');
  const currentTime = document.createElement('div');
  currentTime.id = 'current-time';
  clock.appendChild(currentTime);
  const lastUpdate = document.createElement('div');
  lastUpdate.id = 'last-update';
  lastUpdate.textContent = 'Updated At ...'
  clock.appendChild(lastUpdate);

  startTime();
}

function startTime() {
  const today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();
  h = checkTime(h);
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById('current-time').textContent = `Current Time ${h}:${m}:${s}`;
  setTimeout(startTime, 500);
}

export function updateTime() {
  const today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();
  h = checkTime(h);
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById('last-update').textContent = `Updated At ${h}:${m}:${s}`;
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};
    return i;
}

export function setupTrainIcons(state) {
  const iconDiv = document.getElementById('train-icons');
  const rows = {
    row1: ["A", "C", "E", "B", "D", "F", "M", "L"],
    row2: ["1", "2", "3", "4", "5", "6", "7"],
    row3: ["N", "Q", "R", "W", "G", "J", "Z", "S"]
  }

  Object.values(rows).forEach((row, idx) => {
    const rowDiv = document.createElement('div');
    rowDiv.className = `train-icon-row row${idx}`;
    row.forEach((trainLabel) => {
      const url = trainIcons[trainLabel];
      const trainIcon = document.createElement('img');
      trainIcon.className = `train-label train-${trainLabel}`;
      trainIcon.src = url;
      trainIcon.addEventListener('click', () => {
        const toggleble = toggleTrains(trainLabel, state);
        if (toggleble) toggleClass(trainIcon);
      });
      rowDiv.appendChild(trainIcon);
    });
    iconDiv.appendChild(rowDiv);
  });
}

export function setupToggleButtons() {
  const buttonDiv = document.getElementById('toggle-buttons');
  const toggleAll = document.createElement('div');
  const northBound = document.createElement('div');
  const southBound = document.createElement('div');
  toggleAll.className = 'toggle-button toggle-all';
  toggleAll.textContent = 'Select All';
  northBound.className = 'toggle-button toggle-northbound';
  northBound.textContent = 'Northbound Trains';
  southBound.className = 'toggle-button toggle-southbound';
  southBound.textContent = 'Southbound Trains';
  buttonDiv.appendChild(toggleAll);
  buttonDiv.appendChild(northBound);
  buttonDiv.appendChild(southBound);
}

function toggleTrains(trainLabel, state) {
  let toggleble = false;
  Object.keys(state.trains).forEach((trainId) => {
    const train = state.trains[trainId];
    if (train.trainLabel === trainLabel) {
      train.toggleMarker(state.map);
      toggleble = true;
    }
  });
  return toggleble;
}

function toggleClass(element) {
  element.classList.contains('active') ?
  element.classList.remove('active')
  :
  element.classList.add('active')
};
