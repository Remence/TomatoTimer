let startTime;
let timerInterval;
let isRunning = false;
let isReset = true;

function pad(number) {
    return (number < 10 ? "0" : "") + number;
}

function displayTime(milliseconds) {
    const minutes = Math.floor(milliseconds / (60000));
    const seconds = Math.floor((milliseconds % (60000))/1000);
    const centiseconds = Math.floor((milliseconds % 1000)/10);

    const formattedTime = `${pad(minutes)}:${pad(seconds)}:${pad(centiseconds)}`;
    document.getElementById('timer').textContent = formattedTime;
}

function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 10);
    isRunning = true;
    isReset = false;
}

function updateTimer() {
    const elapsedTime = Date.now() - startTime;
    displayTime(elapsedTime);
}

function pauseTimer(){
    clearInterval(timerInterval);
    isRunning = false;
}

function resetTimer(){
    clearInterval(timerInterval);
    isRunning = false;
    displayTime(0);
    isReset = true;
}


document.getElementById('testButton').addEventListener('click', () => {
    if(isReset){
        startTimer();
    }else if(isRunning && !isReset){
        pauseTimer();
    }else{
        resetTimer();
    }
});