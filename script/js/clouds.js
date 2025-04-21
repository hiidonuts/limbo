let timer;
let isRunning = false;
let timeLeft;
let defaultMinutes = 25;
let beepInterval;

const timeDisplay = document.getElementById('time');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const customMinutes = document.getElementById('customMinutes');
const beepSound = document.getElementById('beepSound');

startBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);

function startTimer() {
    if (isRunning) return;

    const inputMinutes = parseInt(customMinutes.value);
    if (isNaN(inputMinutes) || inputMinutes <= 0) {
        alert('please enter a valid number of minutes.');
        return;
    }

    timeLeft = inputMinutes * 60;
    isRunning = true;
    updateDisplay();

    timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
            isRunning = false;
            startBeeping();
        
            setTimeout(() => {
                alert("end of study session! reset the timer.");
            }, 500);
        
            return;
        }
        
        timeLeft--;
        updateDisplay();
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    stopBeeping();
    isRunning = false;

    const inputMinutes = parseInt(customMinutes.value) || defaultMinutes;
    timeLeft = inputMinutes * 60;
    updateDisplay();
}

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timeDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startBeeping() {
    beepSound.play();
    beepInterval = setInterval(() => {
        beepSound.currentTime = 0;
        beepSound.play();
    }, 1500);
}

function stopBeeping() {
    clearInterval(beepInterval);
    beepSound.pause();
    beepSound.currentTime = 0;
}

function updateClock() {
    const clock = document.getElementById('clock');
    const now = new Date();
    clock.textContent = now.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
}

setInterval(updateClock, 1000);
updateClock();
resetTimer();
