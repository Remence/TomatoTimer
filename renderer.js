let countdown;
let isRunning = false;
let isReset = true;
let timeLeft;
let wasPaused = false;
let isBreak = false;

function pad(number) {
    return (number < 10 ? "0" : "") + number;
}

function displayTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const formattedTime = `${pad(minutes)}:${pad(seconds)}`;
    document.getElementById("timer").textContent = formattedTime;
}

function startTimer() {
    isRunning = true;
    document.getElementById("startButton").textContent = "Stop";
    const minutes = parseInt(document.getElementById("minutesInput").value);
    const breakTime = parseInt(document.getElementById("breakSelect").value);
    if(!wasPaused) {
        timeLeft = minutes * 60;
    }
    if(isBreak){
        timeLeft =  breakTime * 60;
    }
    if (isNaN(minutes) || minutes <= 0) {
        alert("Please enter a valid number of minutes (greater than 0)");
        return;
    }
    clearInterval(countdown);

    countdown = setInterval(() => {
        displayTime(timeLeft);

        if(timeLeft <= 0) {
            clearInterval(countdown);
            alert("Break Time!");
            document.getElementById("startButton").textContent = "Start";
            wasPaused = false;
            isBreak = !isBreak;
        }else{
                timeLeft--;
        }

    }, 1000);
}

function pauseTimer(){
    document.getElementById("startButton").textContent = "Start";
    clearInterval(countdown);
    isRunning = false;
    wasPaused = true;
}

function resetTimer(){
    document.getElementById("startButton").textContent = "Start";
    clearInterval(countdown);
    isRunning = false;
    displayTime(0);
    isReset = true;
    wasPaused = false;
}


document.getElementById('startButton').addEventListener('click', () => {
    if(!isRunning){
        startTimer();
    }else {
        pauseTimer();
    }
});

document.getElementById('restartButton').addEventListener('click', () => {
    resetTimer();
})

// Display the time as the user inputs a number for a session
document.getElementById('minutesInput').addEventListener('input', () => {
    const minutes = parseInt(document.getElementById("minutesInput").value);
    // Check if the input is a valid number and >0
    if (!isNaN(minutes) && minutes > 0 && !isRunning) {
        displayTime(minutes * 60);
    }
    if (isNaN(minutes) || minutes === 0) {
        displayTime(0);
    }
});