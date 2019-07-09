var gameStarted = false;
var wins = 0;
var losses = 0;
var words = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve"
];
var alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z"
];
var currentWord = "start";
var correctCount = 0;
var usedLetters = [];

var guessesRemaining = 6;
var correctGuess = false;

//resets elements to the start state except wins and losses
function reset() {
  guessesRemaining = 6;
  usedLetters.length = 0;
  var usedSection = document.getElementById("usedLetters");
  usedSection.innerHTML = " ";
  var anounce = document.getElementById("anounce");
  anounce.innerText = "Press Space to play again";

  var anounce = document.getElementById("remainingMoves");
  anounce.innerText = guessesRemaining;
  correctCount = 0;
  gameStarted = true;
}

//pass two string first being element id second being you want to anounce
function anouncer(tag, text) {
  let element = document.getElementById(tag);
  element.innerText = text;
}

document.onkeyup = function(event) {
  var letter = event.key.toLowerCase();
  correctGuess = false;
  if (alphabet.includes(letter) && gameStarted) {
    //check if letter has been guessed before anounce if it has
    if (usedLetters.includes(letter)) {
      anouncer("anounce", "You already guessed that");
    } else {
      //add letter pressed to used letter array
      usedLetters.push(letter);
      // anouncer("usedLetters", usedLetters.join(" "));

      let randMarginBottom = Math.random() * 8 + 1 + "vw";

      let randMarginLeft = Math.random() * 3 + 2 + "vw";
      let newDiv = document.createElement("div");
      document.getElementById("usedLetters").appendChild(newDiv);
      newDiv.style.marginBottom = randMarginBottom;
      newDiv.style.marginLeft = randMarginLeft;
      newDiv.className = "usedElement";
      newDiv.innerText = letter;

      //check if letter typed is in word and replace underscore if correct
      for (let i = 0; i < currentWord.length; i++) {
        console.log(currentWord);
        if (letter === currentWord.charAt(i)) {
          anouncer(i, currentWord.charAt(i) + " ");
          correctCount++;
          correctGuess = true;
          anouncer("anounce", "Nice guess");

          //win state
          if (correctCount === currentWord.length) {
            console.log("you win!!");
            wins++;
            gameStarted = false;
            anouncer("winCount", wins);
            anouncer("anounce", "You Win!! Press Space to play again");
          }
        }
      }
      //incorrect guesses decrement guesses
      if (!correctGuess) {
        guessesRemaining--;
        anouncer("remainingMoves", guessesRemaining);
        console.log(guessesRemaining);
        anouncer("anounce", "Incorrect");

        //lose state
        if (guessesRemaining === 0) {
          losses++;
          gameStarted = false;
          anouncer("anounce", "You Lose. Press Space to try again");
          anouncer("lossCount", losses);
        }
      }
    }
    //checks if space is pressed to start the game
  } else if (event.keyCode === 32 && !gameStarted) {
    // sets the game active, picks a word from the list, and sets the board empty
    reset();
    anouncer("anounce", "Press a letter to guess");

    var wordSelectionNumber = Math.floor(Math.random() * words.length);
    currentWord = words[wordSelectionNumber];

    //creates board based on length of picked word
    for (let i = 0; i < 7; i++) {
      if (i < currentWord.length) {
        var elem = document.getElementById(i);
        elem.innerText = "_ ";
      } else {
        var elem = document.getElementById(i);
        elem.innerText = " ";
      }
    }
  }
};
