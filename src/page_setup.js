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
        const toggled = toggleTrains(trainLabel, state);
        if (toggled) {
          toggleClass(trainIcon);
        }
      });
      rowDiv.appendChild(trainIcon);
    });
    iconDiv.appendChild(rowDiv);
  });
}

function toggleTrains(trainLabel, state) {
  let toggle = false;
  Object.keys(state.trains).forEach((trainId) => {
    const train = state.trains[trainId];
    if (train.trainLabel === trainLabel) {
      train.toggleMarker(state.map);
      toggle = true;
    }
  });
  return toggle;
}

function toggleClass(element) {
  if (element.classList.contains('active')) {
    element.classList.remove('active');
  } else {
    element.classList.add('active');
  }
};
