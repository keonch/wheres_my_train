import { trainIcons } from '../assets/train';
import { toggleTrains } from '../util/utils';

function setupTrainIcons(state) {
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
      trainIcon.addEventListener('click', () => toggleTrains(trainLabel, state));
      rowDiv.appendChild(trainIcon);
    });
    iconDiv.appendChild(rowDiv);
  });
}

export default setupTrainIcons;
