// 1. Grab the elements we need from the page
const guessInput = document.getElementById("guess-input");
const guessBtn = document.getElementById("guess-btn");
const feedback = document.getElementById("feedback");
const attemptsDisplay = document.getElementById("attempts");
const newGameBtn = document.getElementById("new-game-btn");

// 2. Game settings
const MIN_NUMBER = 1;
const MAX_NUMBER = 100;

// 3. Pick a random whole number between MIN_NUMBER and MAX_NUMBER
function pickSecretNumber() {
  return Math.floor(Math.random() * (MAX_NUMBER - MIN_NUMBER + 1)) + MIN_NUMBER;
}

// 4. Keep track of the game's state
let secretNumber = pickSecretNumber();
let attempts = 0;
let gameOver = false;

// 5. Show a message in a given style ("low", "high", "win" or "error")
function showFeedback(text, type) {
  feedback.textContent = text;
  feedback.className = type;
}

// 6. Check the player's guess
function checkGuess() {
  if (gameOver) {
    return; // the game has ended, so ignore any more guesses
  }

  const guess = Number(guessInput.value);

  // Make sure the input is valid before counting it
  if (
    guessInput.value === "" ||
    !Number.isInteger(guess) ||
    guess < MIN_NUMBER ||
    guess > MAX_NUMBER
  ) {
    showFeedback("Enter a whole number from " + MIN_NUMBER + " to " + MAX_NUMBER + ".", "error");
    return;
  }

  attempts++;
  attemptsDisplay.textContent = "Attempts: " + attempts;

  if (guess === secretNumber) {
    showFeedback("Correct! You got it in " + attempts + " tries!", "win");
    gameOver = true;
    guessBtn.disabled = true;
  } else if (guess < secretNumber) {
    showFeedback("Too low! Try higher.", "low");
  } else {
    showFeedback("Too high! Try lower.", "high");
  }

  guessInput.value = "";
  guessInput.focus();
}

// 7. Start a fresh game
function newGame() {
  secretNumber = pickSecretNumber();
  attempts = 0;
  gameOver = false;
  guessBtn.disabled = false;
  attemptsDisplay.textContent = "Attempts: 0";
  showFeedback("", "");
  guessInput.value = "";
  guessInput.focus();
}

// 8. React to player actions
guessBtn.addEventListener("click", checkGuess);
newGameBtn.addEventListener("click", newGame);

// Let the player press Enter instead of clicking the button
guessInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    checkGuess();
  }
});