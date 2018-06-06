import trainIcons from '../assets/train_icons.json';

export function setupTime() {
  const clock = document.getElementById('clock');
  const currentTime = document.createElement('div');
  currentTime.id = 'current-time';
  clock.appendChild(currentTime);
  const lastUpdate = document.createElement('div');
  lastUpdate.id = 'last-update';
  lastUpdate.textContent = 'Updated At: fetching..';
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
  document.getElementById('current-time').textContent = `Current Time: ${h}:${m}:${s}`;
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
  document.getElementById('last-update').textContent = `Updated At: ${h}:${m}:${s}`;
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};
    return i;
}

export async function setupControls() {
  const iconsDiv = document.getElementById('train-icons');
  Object.keys(trainIcons).forEach((train) => {
    const trainIconElement = document.createElement('img');
    trainIconElement.id = `${train}-train`;
    trainIconElement.className = 'train loading'
    trainIconElement.src = trainIcons[train];
    iconsDiv.appendChild(trainIconElement);
  });
}

export function setupToggle(line, toggle) {
  if (line === "GS") {
    line = "S";
  } else if (line === "SS") {
    line = "SI";
  }
  if (line === "H") return;
  const trainIcon = document.getElementById(`${line}-train`);
  trainIcon.classList.remove("loading");
  trainIcon.addEventListener("click", () => {
    toggle(line);
  });
}
