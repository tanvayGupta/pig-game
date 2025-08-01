'use strict';

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const diceElement = document.querySelector('.dice');

const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');

const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const newBtn = document.querySelector('.btn--new');

var activePlayer, diceRoll, score;

//Starting Conditions
const initialization = function () {
  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;
  diceElement.classList.add('hidden');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  rollBtn.disabled = false;
  holdBtn.disabled = false;
  activePlayer = 0;
};
initialization();

//Game Logic
rollBtn.addEventListener('click', function () {
  diceElement.classList.remove('hidden');
  diceRoll = Math.trunc(Math.random() * 6) + 1;
  diceElement.src = `dice-${diceRoll}.png`;
  if (activePlayer === 0) {
    if (diceRoll === 1) {
      ActivateOne(); //Switches Active Player
    } else {
      current0.textContent = Number(current0.textContent) + diceRoll;
    }
  } else if (activePlayer === 1) {
    if (diceRoll === 1) {
      ActivateZero(); //Switches Active Player
    } else {
      current1.textContent = Number(current1.textContent) + diceRoll;
    }
  }
});

holdBtn.addEventListener('click', function () {
  if (activePlayer === 0) {
    score0.textContent =
      Number(score0.textContent) + Number(current0.textContent);
    score = Number(score0.textContent);
    if (score >= 100) {
      player0.classList.add('player--winner');
      Won();
    } else {
      ActivateOne();
    }
  } else if (activePlayer === 1) {
    score1.textContent =
      Number(score1.textContent) + Number(current1.textContent);
    score = Number(score1.textContent);
    if (score >= 100) {
      player1.classList.add('player--winner');
      Won();
    } else {
      ActivateZero();
    }
  }
});

newBtn.addEventListener('click', function () {
  initialization();
});

//Additional Fns
function ActivateZero() {
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  current1.textContent = 0;
  activePlayer = 0;
}

function ActivateOne() {
  player0.classList.remove('player--active');
  player1.classList.add('player--active');
  current0.textContent = 0;
  activePlayer = 1;
}

function Won() {
  rollBtn.disabled = true;
  holdBtn.disabled = true;
}
