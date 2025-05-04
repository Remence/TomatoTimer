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
    //console.log("minutes inputted: " +minutes); //DEBUGGING
    const breakTime = parseInt(document.getElementById("breakSelect").value);
    //console.log("break inputted: " +breakTime); //DEBUGGING
    if(!wasPaused) {
        timeLeft = minutes * 60;
    }
    if(isBreak && !wasPaused) {
        timeLeft =  breakTime * 60;
    }
    if (isNaN(minutes) || minutes <= 0) {
        alert("Please enter a valid number of minutes (greater than 0)");
        return;
    }
    clearInterval(countdown);

    //console.log("timeLeft: "+timeLeft); //DEBUGGING

    countdown = setInterval(() => {
        displayTime(timeLeft);

        if(timeLeft <= 0) {
            clearInterval(countdown);
            const audio = new Audio('audios/timerdonesfx.mp3');
            audio.play();
            if(isBreak){
                //alert("Get back to work like a good boy");
                document.getElementById("timerLabel").textContent = "You are now working";
                const minutes = parseInt(document.getElementById("minutesInput").value);
                displayTime(minutes * 60);
            }else{
                //alert("Break Time!");
                document.getElementById("timerLabel").textContent = "You are now on break";
                const breakTime = parseInt(document.getElementById("breakSelect").value);
                displayTime(breakTime * 60);
            }
            document.getElementById("startButton").textContent = "Start";
            wasPaused = false;
            isBreak = !isBreak;
            isRunning = false;
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
    isReset = true;
    wasPaused = false;
    if(isBreak){
        const breakTime = parseInt(document.getElementById("breakSelect").value);
        displayTime(breakTime * 60);
    }else{
        const minutes = parseInt(document.getElementById("minutesInput").value);
        displayTime(minutes * 60);
    }
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

document.getElementById('breakSelect').addEventListener('click', () => {
    const displayBreakTime = parseInt(document.getElementById("breakSelect").value);
    displayTime(displayBreakTime * 60);
})