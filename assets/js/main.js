const btnStart = document.querySelector('.main-button.-start');
const btnPause = document.querySelector('.main-button.-pause');
const btnReset = document.querySelector('.main-button.-reset');
const clock = document.querySelector('.clock-box .timer');
const desiredTime = document.querySelector('input.time-input');
let secondsRemaining;
let timer;
const btnResume = document.createElement('button');
const btnDarkMode = document.querySelector('.main-button.-darkmode');
const btnLightMode = document.querySelector('.main-button.-lightmode');

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
    };

    if (e.target == btnDarkMode) {
        turnOnDarkMode();
        showBtnLightMode();
    };

    if (e.target == btnLightMode) {
        turnOnLightMode();
        showBtnDarkMode()
    };
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
    btnResume.classList.add('main-button');
    btnResume.classList.add('-resume');
    btnResume.textContent = 'Resume';
    btnPause.insertAdjacentElement('afterend', btnResume);
};

function setDefaultState() {
    btnResume.remove();
    btnPause.style.display = 'inline-flex';
};

function turnOnDarkMode() {
    document.body.style.transition = '.2s';
    document.body.classList.add('dark-wrapper');
    btnDarkMode.style.display = 'none';
};

function showBtnLightMode() {
    btnLightMode.style.display = 'flex';
};

function turnOnLightMode() {
    document.body.style.transition = '.2s';
    document.body.classList.remove('dark-wrapper');
    btnLightMode.style.display = 'none';
};

function showBtnDarkMode() {
    btnDarkMode.style.display = 'flex';
};