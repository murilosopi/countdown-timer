const btnStart = document.querySelector('button.start');
const btnPause = document.querySelector('button.pause');
const btnReset = document.querySelector('button.reset');
const clock = document.querySelector('.time-remaining');
const desiredTime = document.querySelector('input.timers-duration');
let secondsRemaining;
let timer;

document.addEventListener('click', (e) => {
    if (e.target == btnReset) {
        clearTimer();
    };
    if (e.target == btnPause) {
        console.log('It Works');
    };
    if (e.target == btnStart) {
        startTimer();
    };
});

function clearTimer() {
    clearInterval(timer);
    return clock.textContent = '00:00:00';
}

function startTimer() {
    secondsRemaining = desiredTime.value;
    timer = setInterval(() => {
        if (secondsRemaining == 0) {
            clearTimer();
        }
        clock.textContent = getTimeFromSeconds(secondsRemaining);
        secondsRemaining--;
    }, 1000);
}

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