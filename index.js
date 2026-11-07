const TEST_DURATION = 10;

let timeLeft = TEST_DURATION;
let timerDisplay = document.getElementById("timer");
let clicksCount = 0;
let clicksDisplay = document.getElementById("totalClicks");
let clickBtn = document.getElementById("click-btn");
let cpsDisplay = document.getElementById("cpsDisplay");
let hasStarted = false;
let isFinished = false;
let timer;

function resetTest() {
    timeLeft = TEST_DURATION;
    clicksCount = 0;
    hasStarted = false;
    isFinished = false;
    clearInterval(timer);

    clicksDisplay.innerText = "0";
    timerDisplay.innerText = "Timer will begin once you start clicking...";
    cpsDisplay.innerText = "START CLICKING TO CALCULATE CPS!";

    clickBtn.disabled = false;
}

function startTimer() {
    clickBtn.innerText = "Click Me!";
    timerDisplay.innerText = "TIMER: " + timeLeft + " secs";

    timer = setInterval(() => {
        timeLeft--;

        if (timeLeft <= 0) {
            clearInterval(timer);
            isFinished = true;
            timerDisplay.innerText = "Time's Up!";
            clickBtn.innerText = "Please wait to restart...";
            clickBtn.disabled = true;
            calculateCPS();

            setTimeout(() => {
                clickBtn.innerText = "Click to Restart!";
                clickBtn.disabled = false;
            }, 3000);

            return;
        }

        timerDisplay.innerText = "TIMER: " + timeLeft + " secs";
    }, 1000);
}

function totalClicks() {
    if (isFinished) {
        resetTest();
    }

    if (!hasStarted) {
        hasStarted = true;
        startTimer();
    }

    clicksCount++;
    clicksDisplay.innerText = clicksCount;
}

function calculateCPS() {
    const CPS = clicksCount / TEST_DURATION;
    cpsDisplay.innerText = "CPS: " + CPS.toFixed(2) + " clicks-per-second";
}