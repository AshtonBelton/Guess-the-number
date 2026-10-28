// 1. Grab the elements we need from the page
const guessInput = document.getElementById("guess-input");
const guessBtn = document.getElementById("guess-btn");
const feedback = document.getElementById("feedback");
const attemptsDisplay = document.getElementById("attempts");
const newGameBtn = document.getElementById("new-game-btn");
const rangeText = document.getElementById("range-text");
const difficultyBtns = document.querySelectorAll(".difficulty-btn");

// 2. Game settings
const MIN_NUMBER = 1;
let maxNumber = 100; // now a let, because difficulty can change it

// 3. Pick a random whole number between MIN_NUMBER and maxNumber
function pickSecretNumber() {
  return Math.floor(Math.random() * (maxNumber - MIN_NUMBER + 1)) + MIN_NUMBER;
}

// 4. Keep track of the game's state
let secretNumber = pickSecretNumber();
let attempts = 0;
let gameOver = false;

// 5. Update what the player sees
function showFeedback(text, type) {
  feedback.textContent = text;
  feedback.className = type;
}

function updateRangeText() {
  rangeText.textContent =
    "I'm thinking of a number between " + MIN_NUMBER + " and " + maxNumber + ".";
}

// 6. Check the player's guess
function checkGuess() {
  if (gameOver) {
    return;
  }

  const guess = Number(guessInput.value);

  if (
    guessInput.value === "" ||
    !Number.isInteger(guess) ||
    guess < MIN_NUMBER ||
    guess > maxNumber
  ) {
    showFeedback("Enter a whole number from " + MIN_NUMBER + " to " + maxNumber + ".", "error");
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

// 7. Start a fresh game (keeps the current difficulty)
function newGame() {
  secretNumber = pickSecretNumber();
  attempts = 0;
  gameOver = false;
  guessBtn.disabled = false;
  attemptsDisplay.textContent = "Attempts: 0";
  showFeedback("", "");
  updateRangeText();
  guessInput.value = "";
  guessInput.focus();
}

// 8. Change the difficulty
function setDifficulty(clickedBtn) {
  maxNumber = Number(clickedBtn.dataset.max);

  // Highlight only the button that was clicked
  difficultyBtns.forEach(function (btn) {
    btn.classList.remove("active");
  });
  clickedBtn.classList.add("active");

  newGame(); // the old secret number might be out of range now
}

// 9. React to player actions
guessBtn.addEventListener("click", checkGuess);
newGameBtn.addEventListener("click", newGame);

guessInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    checkGuess();
  }
});

difficultyBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    setDifficulty(btn);
  });
});

// 10. Draw the starting screen
updateRangeText();