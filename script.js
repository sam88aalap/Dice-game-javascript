'use strict';

// Selecting elements
const getScore0 = document.getElementById('score--0');
const getScore1 = document.getElementById('score--1');
const seeDice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const getCurrentScore0 = document.getElementById('current--0');
const getCurrentScore1 = document.getElementById('current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

// Starting conditions
let currentScore ;
let activePlayer;
let scores;
let game;


// FUNCTIONS
// 1. function to initialise the game.
function init(){

  // appearance
  seeDice.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  getScore0.textContent = 0;
  getScore1.textContent = 0;
  getCurrentScore0.textContent=0;
  getCurrentScore1.textContent=0;

  // internal state variables
  currentScore = 0;
  activePlayer = 0;
  scores = [0,0];
  game = true;

};

init(); //to init when the code is executed.

//2. switch active player
function switchPlayer(){
  document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0; 
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
    activePlayer = activePlayer === 0?1:0;
};

// Dice roll button
btnRoll.addEventListener('click',function(){

  if(game){
    const diceNum=Math.trunc(Math.random() * 6) + 1; // generate random dice roll

  // Displaying dice
  seeDice.classList.remove('hidden');
  seeDice.src = `dice-${diceNum}.png`;

  // Checking for 1
  if(diceNum!==1){
      currentScore+=diceNum;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
  }
  else
    switchPlayer();
  }
  
});

// hold button 
btnHold.addEventListener('click',function(){

  if(game){
    // adding current score to the players total score.
  scores[activePlayer]+=currentScore;
  document.getElementById(`score--${activePlayer}`).textContent=scores[activePlayer];

  //player wins if score is 100
  if(scores[activePlayer]>=50){
    game=false; //in order to disable buttons
    document.querySelector(`.player--${activePlayer}`).classList.add('player--winner'); // change background
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active'); // remove current player background
    seeDice.classList.toggle('hidden'); // hiding dice

    //alternate method to disable buttons after game
    // btnHold.classList.toggle('hidden');
    // btnRoll.classList.toggle('hidden');
  }
  
  // switch player after hold
  else
  switchPlayer();
  }

});

// New game button
btnNew.addEventListener('click',init);