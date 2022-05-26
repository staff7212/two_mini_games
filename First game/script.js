'use strict';

window.addEventListener('DOMContentLoaded', () => {
    
    const checkBtn = document.querySelector('.check'),
          againBtn = document.querySelector('.again'), 
          questionBlock = document.querySelector('.question'),
          input = document.querySelector('.number-input'),
          message = document.querySelector('.guess-message'),
          scorePlayer = document.querySelector('.score'),
          highscorePlayer = document.querySelector('.highscore'),
          body = document.querySelector('body');
    let secretNum = Math.trunc(Math.random() * 20) + 1,
        score = 20,
        highscore = localStorage.getItem('highscore') || 0;
    
    highscorePlayer.textContent = highscore;

    function createMessage(mess) {
        message.textContent = mess;
    }
    
    checkBtn.addEventListener('click', () => {
        let playerNumber = +input.value;

        if (!playerNumber) {

            createMessage('Введите число');

        } else if (playerNumber === secretNum) {

            body.style.backgroundColor = 'rgb(93, 202, 111)';
            createMessage('Правильно');
            questionBlock.textContent = secretNum;
            checkBtn.disabled = true;
            input.disabled = true;
            
            if (score > highscore) {
                highscore = score;
                highscorePlayer.textContent = highscore;
                localStorage.setItem('highscore', highscore);
            } 
        } else if (playerNumber !== secretNum) {
            
            if (score > 1) {
                createMessage(playerNumber > secretNum ? "Слишком много" : "Слишком мало");

                // if (playerNumber > secretNum) {
                //     createMessage("Слишком много");
                // } else {
                //     createMessage("Слишком мало");
                // }

                score--;
                scorePlayer.textContent = score;
            } else {
                createMessage('Проиграл');
                scorePlayer.textContent = 0;
                checkBtn.disabled = true;
                input.disabled = true;
            }
        }
    });

    againBtn.addEventListener('click', () => {
        createMessage("Начни угадывать");
        score = 20;
        questionBlock.textContent = "???";
        scorePlayer.textContent = score;
        document.querySelector('.number-input').value = '';
        checkBtn.disabled = false;
        input.disabled = false;
        secretNum = Math.trunc(Math.random() * 20) + 1;
        body.style.backgroundColor = 'rgb(0, 0, 0)';
    });
});