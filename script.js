'use strict';

const dice = document.querySelector('.dice');
const rollDiceBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const newGameBtn = document.querySelector('.btn--new');
let player_0 = document.querySelector('.player--0');
let player_1 = document.querySelector('.player--1');
let player_name_0 = document.querySelector('#name--0');
let player_name_1 = document.querySelector('#name--1');
let score_0 = Number(document.querySelector('#score--0').textContent);
let score_1 = Number(document.querySelector('#score--1').textContent);
let currScore = 0;


dice.classList.add('hidden');


function GeneRandomDice() {
    return Math.trunc(Math.random() * 6) + 1;
}

function displayDice(result) {

    document.querySelector('img').src = `./dice-${result}.png`;
}

function currPlayer() {
    return player_0.classList.contains('player--active') ? 0 : 1;
}

function switchPlayer() {
    let currentPlayer = player_0.classList.contains('player--active') ? 0 : 1;
    if (currentPlayer == 0) {
        player_0.classList.remove('player--active');
        player_1.classList.add('player--active');
    } else {
        player_1.classList.remove('player--active');
        player_0.classList.add('player--active');
    }
}

function incCurrentScore(player, currScore) {
    if (player == 0) {
        document.querySelector('#current--0').textContent = currScore;
    } else {
        document.querySelector('#current--1').textContent = currScore;
    }
}

function storeScore(currScore, currentPlayer) {
    if (currentPlayer == 0) {
        score_0 += currScore;
        document.querySelector('#score--0').textContent = score_0;
        console.log(score_0);
    } else {
        score_1 += currScore;
        document.querySelector('#score--1').textContent = score_1;
    }
}

function initCurrScoreZero(currentPlayer) {
    document.querySelector(`#current--${currentPlayer}`).textContent = 0;
}

function Win(currentPlayer) {
    if (currentPlayer == 0) {
        player_0.classList.add('player--winner');
        player_name_0.classList.add('player--winner');
    }
    else if (currentPlayer == 1) {
        player_1.classList.add('player--winner')
        player_name_1.classList.add('player--winner');
    }
}

function getCurrScore(currentPlayer) {
    if (currentPlayer == 0) {
        return score_0;
    }
    else if (currentPlayer == 1) {
        return score_1;
    }
}

newGameBtn.addEventListener('click', function () {
    currScore = 0;
    score_0 = 0;
    score_1 = 0;

    player_0.classList.remove('player--winner');
    player_name_0.classList.remove('player--winner');
    player_1.classList.remove('player--winner')
    player_name_1.classList.remove('player--winner');

    initCurrScoreZero(0);
    initCurrScoreZero(0);

    document.querySelector('#score--0').textContent = 0;
    document.querySelector('#score--1').textContent = 0;

    player_1.classList.remove('player--active');
    player_0.classList.add('player--active');

    dice.classList.add('hidden')
})

holdBtn.addEventListener('click', function () {
    let currentPlayer = currPlayer();

    if (getCurrScore(currentPlayer) < 100) {
        storeScore(currScore, currentPlayer);
    }


    if (getCurrScore(currentPlayer) >= 100) {
        Win(currentPlayer);
        return;
    }
    else {
        switchPlayer();
        currScore = 0;
        initCurrScoreZero(currentPlayer);
        storeScore(currScore, currentPlayer);
    }
})

rollDiceBtn.addEventListener('click', function () {
    dice.classList.remove('hidden')
    let currentPlayer = currPlayer();

    if (getCurrScore(currentPlayer) >= 100) {
        return;
    }

    let random_dice = GeneRandomDice();
    displayDice(random_dice);
    currScore = currScore + random_dice;

    if (random_dice === 1) {
        currScore -= 1;
        switchPlayer();
        initCurrScoreZero(currentPlayer);
        currScore = 0;
    } else {
        incCurrentScore(currentPlayer, currScore);

    }

})
