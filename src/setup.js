import trainIcons from '../assets/train_icons.json';

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

export function setupControls(state) {
  const icons = document.getElementById('train-icons');
  const cols = {
    col1: ["A", "C", "E", "B", "D", "F", "M", "N", "Q", "R", "W", "G"],
    col2: ["1", "2", "3", "4", "5", "6", "7", "L", "S", "J", "Z", "SI"]
  }

  Object.values(cols).forEach((col, idx) => {
    const column = document.createElement('div');
    column.className = `column column${idx}`;
    col.forEach((train) => {
      const trainIcon = document.createElement('img');
      trainIcon.id = `${train}-train`;
      trainIcon.className = 'train loading'
      trainIcon.src = trainIcons[train];
      column.appendChild(trainIcon);
    });
    icons.appendChild(column);
  });
}

export function setupToggle(line) {
  if (line === "GS") {
    line = "S";
  } else if (line === "SS") {
    line = "SI";
  }
  const trainIcon = document.getElementById(`${line}-train`);
  trainIcon.classList.remove("loading");
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
