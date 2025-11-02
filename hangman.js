var POSSIBLE_WORDS = ["obdurate", "verisimilitude", "defenestrate", "obsequious", "dissonant", "toady", "idempotent"];
var MAX_GUESSES = 6;
var guess_count = MAX_GUESSES;
var word = "";
var guesses = "";
//marks whether or not the current game is over, initialized as "true" because no game is going on so it's over
var isEnd = true;

function newGame() {
    var randomIndex = parseInt(Math.random() * (POSSIBLE_WORDS.length));
    var winOrLose = document.getElementById("message");
    winOrLose.innerHTML = "";
    word = POSSIBLE_WORDS[randomIndex];
    guesses = "";
    guess_count = MAX_GUESSES;
    isEnd = false;
    updatePage();
}

function guessLetter() {
    var input = document.getElementById("guess");
    var winOrLose = document.getElementById("message");
    var letter = input.value;
    //checks if current game is over, if not checks if word is not empty string and 
    //whether or not the current guess is in the word or has already been guessed
    if (isEnd == true) {
        winOrLose.innerHTML = "Please start a new game!";
    } else if ((word !== "") && (guesses.indexOf(letter) < 0) && (guess_count > 0) && (isEnd == false)) {
        guesses += letter;
    }
    if ((word.indexOf(letter) < 0) && (guess_count > 0) && (word !== "") && (isEnd == false) && (guesses.indexOf(letter) < 0)) {
        guess_count--;
    }
    updatePage();
    //clears the input text
    input.value = "";
}

function updatePage() {
    var clueString = "";
    for (var i = 0; i < word.length; i++) {
        var currentLetter = word.charAt(i);
        if (guesses.indexOf(currentLetter) >= 0) {
            clueString += currentLetter + " ";
        } else {
            clueString += "_ ";
        }
    }
    // update clue string
    var clue = document.getElementById("clue");
    clue.innerHTML = clueString;
    //update guesses from user
    var guessArea = document.getElementById("guesses");
    if (word !== "") {
        guessArea.innerHTML = "Guessed letters: " + guesses;
    } else {
        guessArea.innerHTML = "Please press the New Game button to play before making a guess.";
    }
    //update the image
    var image = document.getElementById("hangmanImage");
    image.src = "images/hangman" + guess_count + ".gif";
    //winning and losing
    var endOfGame = document.getElementById("message");
    //checks if there are any underscores present in the clueString
    //if there aren't, word is fully guessed
    if ((clueString.indexOf("_") < 0) && word !== "") {
        endOfGame.innerHTML = "You win! The word was: " + word;
        isEnd = true;
    }
    //checks for amount of guesses
    //if it reaches 0, the game ends and displays the word.
    if (guess_count == 0) {
        endOfGame.innerHTML = "You lose :( The word was: " + word;
        isEnd = true;
    }
}