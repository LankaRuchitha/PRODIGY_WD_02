let startTime = 0;
let updatedTime = 0;
let difference = 0;
let tInterval;
let running = false;
let lapCount = 0;
const display = document.getElementById("display");
const startStopBtn = document.getElementById("startStopBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapsList = document.getElementById("lapsList");

startStopBtn.addEventListener("click", startStop);
resetBtn.addEventListener("click", reset);
lapBtn.addEventListener("click", recordLap);

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - difference;
        tInterval = setInterval(getShowTime, 1);
        running = true;
        startStopBtn.innerHTML = "Pause";
        resetBtn.disabled = true;
        lapBtn.disabled = false;
    } else {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        running = false;
        startStopBtn.innerHTML = "Start";
        resetBtn.disabled = false;
        lapBtn.disabled = true;
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    startStopBtn.innerHTML = "Start";
    difference = 0;
    display.innerHTML = "00:00:00";
    resetBtn.disabled = true;
    lapBtn.disabled = true;
    lapsList.innerHTML = "";
    lapCount = 0;
}

function getShowTime() {
    updatedTime = new Date().getTime() - startTime;
    let hours = Math.floor((updatedTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((updatedTime % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((updatedTime % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((updatedTime % 1000) / 10);
    
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;
    
    display.innerHTML = hours + ":" + minutes + ":" + seconds + ":" + milliseconds;
}

function recordLap() {
    if (running) {
        lapCount++;
        const lapItem = document.createElement("li");
        lapItem.innerText = `Lap ${lapCount}: ${display.innerHTML}`;
        lapsList.appendChild(lapItem);
    }
}
