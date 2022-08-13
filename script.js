'use strict';
const player0El = document.querySelector('.player--0')
const player1El = document.querySelector('.player--1')
const diceImage = document.querySelector('.dice')
const score0El = document.getElementById('score--0')
const score1El = document.getElementById('score--1')
const newGameBtn = document.querySelector('.btn--new')
const rollBtn = document.querySelector('.btn--roll')
const holdBtn = document.querySelector('.btn--hold')
const currentScore0El = document.getElementById('current--0')
const currentScore1El = document.getElementById('current--1')

const activeImage = document.getElementById('player--active')

//initiailizing the game
    let playerScores, currentScore, active, gameOn; 

    function  initializing () {
        playerScores = [0, 0]
        currentScore = 0
        active = 0
        gameOn = true

        score0El.textContent = 0
        score1El.textContent = 0
        currentScore0El.textContent = 0
        currentScore1El.textContent = 0

        diceImage.classList.add('hide')
        player0El.classList.remove('player--winner')
        player1El.classList.remove('player--winner')
        player0El.classList.add('player--active')
        player1El.classList.remove('player--active')
    };

initializing();

//switch player function 
function customSwitch() {
    document.getElementById(`current--${active}`).textContent = 0
    currentScore = 0
    active = active === 0 ? 1 : 0 
    player0El.classList.toggle('player--active')
    player1El.classList.toggle('player--active')
};

//roll a dice function
rollBtn.addEventListener('click', rollDice)
    
function rollDice () {
    if(gameOn){
        //generate and display dice
        let dice = Math.trunc((Math.random() * 6) + 1)
        diceImage.classList.remove('hide')
        diceImage.src = `dice-${dice}.png`

        //check if its not a 1 and add to current score 
        if(dice !== 1 ) {
            currentScore += dice 
            document.getElementById(`current--${active}`).textContent = currentScore
        }

        //if its a 1 we want to switch the players
        else {
            customSwitch()
        }
    }
};

//hold a dice function
holdBtn.addEventListener('click', holdDice)

function holdDice() {
    if(gameOn){
        //addding currentscore to total score
        playerScores[active]  += currentScore;
        document.getElementById(`score--${active}`).textContent = playerScores[active];

        //check if playerScores >= 50
        if( playerScores[active] >= 50 ) {
        //then the game ends
            gameOn = false
            diceImage.classList.add('hide')
            document.querySelector(`.player--${active}`).classList.add('player--winner')
            document.querySelector(`.player--${active}`).classList.remove('player--active')
        }

        //else we want to switch the players
        else{
            customSwitch()
        }
    }
};

newGameBtn.addEventListener('click', initializing)
    
