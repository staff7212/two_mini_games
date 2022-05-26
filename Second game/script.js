'use strict';

document.addEventListener('DOMContentLoaded', () => {

    const score0Element = document.querySelector('#score--0'),
          score1Element = document.querySelector('#score--1'),
          current0Element = document.querySelector('#current--0'),
          current1Element = document.querySelector('#current--1'),
          diceElement = document.querySelector('.dice'),
          btnNew = document.querySelector('.btn--new'),
          btnRoll = document.querySelector('.btn--roll'),
          btnHold = document.querySelector('.btn--hold'),
          player0Element = document.querySelector('.player--0'),
          player1Element = document.querySelector('.player--1');

    let totalScores, currentScore, activePlayer, isPlaying;

    function init() {
        totalScores = [0, 0];
        currentScore = 0;
        activePlayer = 0;
        isPlaying = true;

        score0Element.textContent = 0;
        score1Element.textContent = 0;
        current0Element.textContent = 0;
        current1Element.textContent = 0;
        player0Element.classList.remove('player--winner');
        player1Element.classList.remove('player--winner');
        player0Element.classList.remove('player--active');
        player1Element.classList.remove('player--active');
        player0Element.classList.add('player--active');
        diceElement.classList.add('hidden');
    }
    init();

    function switchActivePlayer() {
        currentScore = 0;
        document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
        activePlayer = activePlayer === 0 ? 1 : 0;
        player0Element.classList.toggle('player--active');
        player1Element.classList.toggle('player--active');
    }

    btnRoll.addEventListener('click', () => {
        if (isPlaying) {
            //рандомное число
            const diceNumber = Math.trunc(Math.random() * 6) + 1;

            diceElement.classList.remove('hidden');
            diceElement.src = `dice${diceNumber}.png`;

            if (diceNumber !== 1) {
                currentScore += diceNumber;
                document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
            } else {
                switchActivePlayer();
            }
        }
    });

    btnHold.addEventListener('click', () => {
        if (isPlaying) {
            totalScores[activePlayer] += currentScore;
            document.querySelector(`#score--${activePlayer}`).textContent = totalScores[activePlayer];
    
            if (totalScores[activePlayer] >= 100) {
                isPlaying = false;
                document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
                document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            } else {
                switchActivePlayer();
            }
        }
    });

    btnNew.addEventListener('click', init);

});
