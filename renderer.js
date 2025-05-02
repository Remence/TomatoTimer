let countdown;
let isRunning = false;
let isReset = true;

function pad(number) {
    return (number < 10 ? "0" : "") + number;
}

function displayTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const formattedTime = `${pad(minutes)}:${pad(seconds)}`;
    document.getElementById('timer').textContent = formattedTime;
}

function startTimer() {
    const minutes = parseInt(document.getElementById("minutes").value);
    if (isNaN(minutes) || minutes <= 0) {
        alert("Please enter a valid number of minutes (greater than 0)");
        return;
    }
    clearInterval(countdown);

    let timeLeft = minutes * 60;

    countdown = setInterval(() => {
        displayTime(timeLeft);

        if(timeLeft <= 0) {
            clearInterval(countdown);
            alert("Time is up!");
        }else{
                timeLeft--;
        }

    }, 1000);
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