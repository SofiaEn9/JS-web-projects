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
score0Element.textContent = "0";
score1Element.textContent = "0";
diceElement.classList.add("hidden");

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

function rollDice() {
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
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0Element.classList.toggle("player--active");
    player1Element.classList.toggle("player--active");
  }
}

rollDiceBtn.addEventListener("click", rollDice);
