playGame();

function playGame(){
    let maxAttempts = 6;
    let attempts = 0;
    let word = getNewWord();

    let gameBoard = document.getElementById('gameboard');
    let attemptsTile = document.getElementById('attempts');
    gameBoard.innerText = word;
    attemptsTile.innerText = attempts;
}

function getNewWord(){
    let words = ['son','kane','alli','lamela','bale'];
    let rand = Math.floor(Math.random()*words.length);
    return words[rand];
}