const WIN_MESSAGE = "You win!";
const LOSE_MESSAGE = "You lose!";

var word = "";
var guess = [];
var level = "";
var attempts = 0;
var maxAttempts = 0;
var usedLetters = [];
var message = "";
var gameOver = false;

function playGame(level = "easy") {
  maxAttempts = getMaxAttempts(level);
  initialize();
  showProgress();

  document.onkeypress = checkLetter;
}

function initialize() {
  attempts = 0;
  usedLetters = [];
  word = getNewWord();
  guess = word.split("").fill("_");
  message = "";
  gameOver = false;
}

function getMaxAttempts(level) {
  let levels = {
    easy: 10,
    hard: 5,
  };
  return levels[level];
}

function getNewWord() {
  let words = ["son", "kane", "alli", "lamela", "bale", "lloris"];
  let rand = Math.floor(Math.random() * words.length);
  return words[rand];
}

function checkLetter(e) {
  if (gameOver) {
    return;
  }

  let charCode = e.keyCode;
  if (lettersOnly(charCode)) {
    let triedLetter = e.key;
    if (!usedLetters.includes(triedLetter)) {
      usedLetters.push(triedLetter);

      let foundLetter = false;
      for (let i = 0; i < word.length; i++) {
        if (word[i] == triedLetter) {
          guess[i] = triedLetter;
          foundLetter = true;
        }
      }

      if (!foundLetter) {
        attempts++;
      }

      if (guess.toString().replaceAll(",", "") == word) {
        message = WIN_MESSAGE;
        gameOver = true;
      } else if (attempts == maxAttempts) {
        message = LOSE_MESSAGE;
        gameOver = true;
      }
    }
  }
  showProgress();
}

function lettersOnly(char) {
  if ((char > 64 && char < 91) || (char > 96 && char < 123)) {
    return true;
  }
  return false;
}

function showProgress() {
  let wordTile = document.getElementById("theWord");
  let attemptsTile = document.getElementById("attempts");
  let usedTile = document.getElementById("usedLetters");
  let messageTile = document.getElementById("message");
  wordTile.innerText = guess.join(" ");
  attemptsTile.innerText = attempts + " of " + maxAttempts;
  usedTile.innerText = usedLetters.toString();
  messageTile.innerText = message;
}
