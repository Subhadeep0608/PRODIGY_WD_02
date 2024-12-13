let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let isRunning = false;
let lapCount = 0;

const timeDisplay = document.getElementById("timeDisplay");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapList = document.getElementById("lapList");

// Function to format time as min:sec:millisec
function formatTime(ms) {
  const minutes = String(Math.floor(ms / 60000)).padStart(2, "0");
  const seconds = String(Math.floor((ms % 60000) / 1000)).padStart(2, "0");
  const milliseconds = String(Math.floor((ms % 1000) / 10)).padStart(2, "0");
  return `${minutes}:${seconds}:${milliseconds}`;
}

// Update the display
function updateDisplay() {
  timeDisplay.textContent = formatTime(elapsedTime);
}

// Start the stopwatch
function startStopwatch() {
  if (!isRunning) {
    isRunning = true;
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay();
    }, 10);
  }
}

// Pause the stopwatch
function pauseStopwatch() {
  if (isRunning) {
    isRunning = false;
    clearInterval(timerInterval);
  }
}

// Reset the stopwatch
function resetStopwatch() {
  isRunning = false;
  clearInterval(timerInterval);
  elapsedTime = 0;
  lapCount = 0;
  updateDisplay();
  lapList.innerHTML = ""; // Clear lap list
}

// Record a lap
function recordLap() {
  if (isRunning) {
    lapCount++;
    const lapTime = formatTime(elapsedTime);
    const lapItem = document.createElement("div");
    lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
    lapItem.style.margin = "5px 5px";
    lapItem.style.padding = "5px 100px";
    lapItem.style.background = "rgb(211, 208, 79)";
    lapItem.style.color = "rgb(33, 51, 99)";
    lapItem.style.borderRadius = "5px";
    lapList.appendChild(lapItem);
  }
}

// Attach event listeners
startBtn.addEventListener("click", startStopwatch);
pauseBtn.addEventListener("click", pauseStopwatch);
resetBtn.addEventListener("click", resetStopwatch);
lapBtn.addEventListener("click", recordLap);

// Initialize display
updateDisplay();
