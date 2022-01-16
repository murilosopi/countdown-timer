const btnStart = document.querySelector('button.start');
const btnPause = document.querySelector('button.pause');
const btnReset = document.querySelector('button.reset');
const clock = document.querySelector('.time-remaining');
const desiredTime = document.querySelector('input.timers-duration');
let secondsRemaining;
let timer;
const btnResume = document.createElement('button');

document.addEventListener('click', (e) => {
    if (e.target == btnReset) {
        resetTimer();
        setDefaultState();
    };
    if (e.target == btnPause) {
        pauseTimer()
    };
    if (e.target == btnStart) {
        resetTimer();
        setDefaultState();
        startTimer(desiredTime.value);
    };

    if (e.target == btnResume) {
        resumeTimer();
    }
});

function getTimeFromSeconds(seconds) {
    const msRemaining = seconds * 1000;
    const date = new Date(msRemaining);
    return date.toLocaleTimeString('pt-BR', {
        hour12: false,
        timeZone: 'UTC',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });
};

function startTimer(time) {
    secondsRemaining = time;
    timer = setInterval(() => {
        if (secondsRemaining == 0) {
            resetTimer();
        }
        updateClock(getTimeFromSeconds(secondsRemaining));
        secondsRemaining--;
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    secondsRemaining = 0;
    updateClock(getTimeFromSeconds(0));
}

function updateClock(info) {
    clock.textContent = info;
};

function pauseTimer() {
    if (secondsRemaining > 0) {
        clearInterval(timer);
        btnPause.style.display = 'none';
        createResumeButton();
    };
};

function resumeTimer() {
    startTimer(secondsRemaining);
    setDefaultState();
};

function createResumeButton() {
    btnResume.classList.add('resume');
    btnResume.textContent = 'Resume';
    btnPause.insertAdjacentElement('afterend', btnResume);
};

function setDefaultState() {
    btnResume.remove();
    btnPause.style.display = 'inline-flex';
};