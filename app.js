const squares = document.querySelectorAll('.square');
const mole = document.querySelector('.mole');
const timeLeft = document.getElementById('time-left');
const score = document.getElementById('score');
const startButton = document.querySelector('#start-button');
//const easyButton = document.getElementById('easy-button');
//const mediumButton = document.getElementById('medium-button');
//const hardButton = document.getElementById('hard-button');
const diffButtons = document.querySelectorAll('.diff-button');

let result = 0;
let hitPosition;
let currentTime = 60;
let timerId = null;
let countDownTimerId;
let difficulty = null;
let difficultyId;

function randomSquare() {
    squares.forEach(square => {
        square.classList.remove('mole');
    })

    let randomSquare = squares[Math.floor(Math.random() * 9)];
    randomSquare.classList.add('mole');

    hitPosition = randomSquare.id;
}

diffButtons.forEach(diffButton => diffButton.addEventListener('click', (e) => {
    difficultyId = e.target.id;
    
    if (difficultyId === 'easy-button') {
        difficulty = 800;        
    }
    if (difficultyId === 'medium-button') {
        difficulty = 600;        
    }
    if (difficultyId === 'hard-button') {
        difficulty = 400;        
    }
}))

squares.forEach(square => {
    square.addEventListener('mousedown', () => {
        if (square.id == hitPosition) {
            result++
            score.textContent = result;
            hitPosition = null;
        }
    })
})

function moveMole() {
    timerId = setInterval(() => {
        randomSquare();
    }, difficulty);
}

function countDown() {
    currentTime--
    timeLeft.textContent = currentTime;

    if (currentTime == 0) {
        clearInterval(countDownTimerId);
        clearInterval(timerId);
        alert('Game over! Your final score is: ' + result);
        difficulty = null;
    }
}

startButton.addEventListener('click', function () {
    if (difficulty !== null) {
    moveMole();
    countDownTimerId = setInterval(countDown, 1000);
    timeLeft.textContent = currentTime;
    currentTime = 60;
    result = 0;
    } else {
        alert('Please select a difficulty!');
    }
})
