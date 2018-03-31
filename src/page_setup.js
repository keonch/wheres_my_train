import { trainIcons } from '../assets/train';

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
  const toggleAll = document.createElement('button');
  const northBound = document.createElement('button');
  const southBound = document.createElement('button');
  toggleAll.className = 'toggle-all';
  toggleAll.textContent = 'Select All';
  northBound.className = 'toggle-northbound';
  northBound.textContent = 'Northbound Trains';
  southBound.className = 'toggle-southbound';
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
