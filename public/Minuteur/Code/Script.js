//initialisation des variables
let minutesLeft = 0; 
let secondsLeft = 0; 
let timerInterval;

const audio = document.getElementById("audio")

//fonction pour mettre à jour la minuteur
function updateTimerDisplay() {
    document.getElementById('minutes').textContent = String(minutesLeft).padStart(2, '0');
    document.getElementById('seconds').textContent = String(secondsLeft).padStart(2, '0');
}

//fonction pour mettre en place le minuteur 
function startTimer() {
    const minutesInput = parseInt(document.getElementById('minutesInput').value);
    const secondsInput = parseInt(document.getElementById('secondsInput').value);

    if (isNaN(minutesInput) && isNaN(secondsInput)) {
        alert('Veuillez entrer une durée valide en minutes et/ou secondes.');
        return;
    }

    minutesLeft = minutesInput || 0;
    secondsLeft = secondsInput || 0;
    updateTimerDisplay();

    document.getElementById('minutesInput').disabled = true;
    document.getElementById('secondsInput').disabled = true;
    document.getElementById('startButton').disabled = true;
    document.getElementById('stopButton').disabled = false;

    timerInterval = setInterval(function () {
        if (minutesLeft === 0 && secondsLeft === 0) {
            audio.play();
            clearInterval(timerInterval);
            timerInterval = null;
            document.getElementById('minutesInput').disabled = false;
            document.getElementById('secondsInput').disabled = false;
            document.getElementById('startButton').disabled = false;
            document.getElementById('stopButton').disabled = true;
        } else {
            if (secondsLeft === 0) {
                minutesLeft -= 1;
                secondsLeft = 59;
            } else {
                secondsLeft -= 1;
            }
            updateTimerDisplay();
        }
    }, 1000);
}

//fonction pour arreter le minuteur 
function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    document.getElementById('minutesInput').disabled = false;
    document.getElementById('secondsInput').disabled = false;
    document.getElementById('startButton').disabled = false;
    document.getElementById('stopButton').disabled = true;
}

document.getElementById('startButton').addEventListener('click', startTimer);
document.getElementById('stopButton').addEventListener('click', stopTimer);
