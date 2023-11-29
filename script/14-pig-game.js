"use strict";

const player0Element = document.querySelector(".player--0");
const player1Element = document.querySelector(".player--1");
const score0Element = document.getElementById("score--0");
const score1Element = document.getElementById("score--1");
const currentScore0Element = document.getElementById("current--0");
const currentScore1Element = document.getElementById("current--1");

const diceElement = document.querySelector(".dice");
const newGameBtn = document.querySelector(".btn--new");
const rollDiceBtn = document.querySelector(".btn--roll");
const holdScoreBtn = document.querySelector(".btn--hold");

// Define starting conditions
let scores, currentScore, activePlayer, isPlaying;

function setStarttingConditions() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  isPlaying = true;

  score0Element.textContent = 0;
  score1Element.textContent = 0;
  currentScore0Element.textContent = 0;
  currentScore1Element.textContent = 0;

  diceElement.classList.add("hidden");
  player0Element.classList.remove("player--winner");
  player1Element.classList.remove("player--winner");
  player0Element.classList.add("player--active");
  player1Element.classList.remove("player--active");
}

function switchPlayer() {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Element.classList.toggle("player--active");
  player1Element.classList.toggle("player--active");
}

function rollDice() {
  if (isPlaying) {
    // 1. roll dice
    let dice = Math.trunc(Math.random() * 6 + 1);

    // 2. display dice
    diceElement.src = `media/dice-${dice}.png`;
    diceElement.classList.remove("hidden");

    // 3. if !== 1, display score
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      document.getElementById(`score--${activePlayer}`).textContent = 0;
      switchPlayer();
    }
  }
}

function holdPlayerScore() {
  if (isPlaying) {
    // 1. Add score to active player's score
    console.log(currentScore);
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. If player's score >= 100
    if (scores[activePlayer] >= 100) {
      // 2.a Finish Game
      isPlaying = false;
      diceElement.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      // 2.b Switch player

      switchPlayer();
    }
  }
}

rollDiceBtn.addEventListener("click", rollDice);
holdScoreBtn.addEventListener("click", holdPlayerScore);
newGameBtn.addEventListener("click", setStarttingConditions);

setStarttingConditions();
