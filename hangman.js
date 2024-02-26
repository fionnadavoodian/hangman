const wordList = [
    // "ELEPHANT", "GIRAFFE", "TIGER", "PENGUIN", "KANGAROO", "DOLPHIN", "CROCODILE", "ZEBRA",
    // "AUSTRALIA", "CANADA", "BRAZIL", "FRANCE", "JAPAN", "EGYPT", "MEXICO", "INDIA",
    // "HAPPY", "SAD", "EXCITED", "ANXIOUS", "LOVE", "ANGRY", "SURPRISED", "CONFUSED",
    // "TEACHER", "DOCTOR", "ENGINEER", "ARTIST", "ATHLETE", "SCIENTIST", "MUSICIAN", "WRITER",
    // "BIRD", "MALL", "MEAL", "DISK", "OVEN", "POET", "ROAD", "HALL", "EXAM", "FACT",
    // "KING", "WEEK", "UNIT", "SOUP", "GATE", "BATH", "HAIR", "MOOD", "WOOD", "LOVE",
    // "CELL", "MENU", "LOSS", "MODE", "ARMY", "TOWN", "FOOD", "ROLE", "DATA", "MATH",
    // "BEER", "CITY", "GIRL", "AREA", "LAKE", "DESK", "SONG", "YEAR", "WIFE", "USER",
    "LADY", "GOAL"
];

let chosenWord = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();
let guessedLetters = new Set();
let attemptsLeft = 6;
let wordDisplay;

const hangmanImages = [
    "../hangman_images/hangman0.png",
    "../hangman_images/hangman1.png",
    "../hangman_images/hangman2.png",
    "../hangman_images/hangman3.png",
    "../hangman_images/hangman4.png",
    "../hangman_images/hangman5.png",
    "../hangman_images/hangman6.png"
];


function initializeGameDisplay() {
    const wordDisplay = document.getElementById("wordDisplay");
    wordDisplay.innerHTML = chosenWord.split('').map(letter => {
        return `<span class="letter">${guessedLetters.has(letter) ? letter : '_'}</span>`;
    }).join(' ');
}
const alphabet = [
    "QWERTYUIOP",
    "ASDFGHJKL",
    "ZXCVBNM"
]
// A function to create an on-screen keyboard with clickable buttons for each letter.
function createKeyboard() {
    // Grabs the DOM element container for the keyboard.
    const keyboardContainer = document.getElementById("keyboard");

    // Iterates over each keyboard row.
    alphabet.forEach(row => {
        // Creates a new div element for a row of keys.
        const rowContainer = document.createElement("div");
        rowContainer.classList.add("keyboard-row");

        // Iterates over each letter in the row.
        row.split('').forEach(key => {
            // Creates a button for each key.
            const button = document.createElement("button");
            button.textContent = key; // Sets the button text to be the letter.
            button.classList.add("keyboard-key"); // Adds a class for styling the key.
            // Adds an event listener to handle clicks on this key.
            button.addEventListener('click', function () {
                handleKeyClick(key);
                // Changes the class of the button to indicate it has been clicked.
                button.classList.replace("keyboard-key", "keyboard-key-clicked");
            });
            // Appends the button to the row container.
            rowContainer.appendChild(button);
        });

        // Appends the complete row of keys to the keyboard container.
        keyboardContainer.appendChild(rowContainer);
    });
}
// A function that handles what happens when a key is clicked.
function handleKeyClick(key) {
    // Trims the key and converts it to uppercase.
    const letter = key.trim().toUpperCase();

    // Checks if the letter has not already been guessed.
    if (!guessedLetters.has(letter)) {
        // Adds the new letter to the set of guessed letters.
        guessedLetters.add(letter);
        // If the chosen word does not include the guessed letter, decrement attempts and update image.
        if (!chosenWord.includes(letter)) {
            attemptsLeft--; // Decrements the attempts left.
            updateHangmanImage(); // Calls a function to update the hangman image.
        }
        // Update the display of the word after each guess.
        updateGameDisplay();
    }
}

function updateHangmanImage() {
    const hangmanImage = document.getElementById("hangmanImage");
    hangmanImage.src = hangmanImages[6 - attemptsLeft];
}

// A function to update the displayed word and check for a win or a loss.
function updateGameDisplay() {
    // Grabs the DOM element where the word is displayed.
    const wordDisplay = document.getElementById("wordDisplay");
    // Updates its inner HTML to show the correctly guessed letters or underscores for unguessed letters.
    wordDisplay.innerHTML = chosenWord.split('').map(letter => {
        return `<span class="letter">${guessedLetters.has(letter) ? letter : '_'}</span>`;
    }).join(' ');

    // Checks if the game is over due to running out of attempts or by guessing all letters.
    if (attemptsLeft === 0 || !wordDisplay.innerHTML.includes('_')) {
        // Disables further input on the keyboard.
        disableKeyboard();
        // Check and display appropriate game over message.
        if (attemptsLeft === 0) {
            // Shows the loss message and the correct word.
            result.innerHTML = `<span style="color: red;">You lost!</span><br><span style="color: black;">The word was ${chosenWord}</span>`;
            playSound('loseSound'); // Plays a sound indicating the loss.
            showRestartMessage() // Shows the option to restart the game.
        } else {
            // Shows the win message.
            result.innerHTML = `<span style="color: green; padding:0;">You won!</span>`;
            playSound('winSound'); // Plays a sound indicating the win.
            showRestartMessage() // Shows the option to restart the game.
        }
    }
    else {
        // Hides the restart message if the game is ongoing.
        hideRestartMessage();
    }
}
// A function that disables the keyboard by disabling the buttons and removing event listeners.
function disableKeyboard() {
    // Selects all the keyboard buttons.
    const keyboardButtons = document.querySelectorAll(".keyboard-key");
    keyboardButtons.forEach(button => {
        // Removes click event listeners from each button.
        button.removeEventListener('click', function () { });
        // Disables each button.
        button.disabled = true;
    });
}
function resetGame() {
    // Reset the chosen word with a new random word from the list
    chosenWord = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();

    // Clear guessed letters and reset attempts
    guessedLetters = new Set();
    attemptsLeft = 6;

    // Re-initialize the game display
    initializeGameDisplay();

    // Hide the restart message and update the hangman image to the starting image
    hideRestartMessage();
    updateHangmanImage()
    // Enable the keyboard and reset the keys' classes
    enableKeyboard();

    // Clear any previous result messages
    const result = document.getElementById('result');
    result.innerHTML = '';

    // Remove 'keyboard-key-clicked' class from all keys
    const keys = document.querySelectorAll('.keyboard-key, .keyboard-key-clicked');
    keys.forEach(key => {
        key.classList.remove('keyboard-key-clicked');
        key.classList.add('keyboard-key');
    });
}

function enableKeyboard() {
    const keyboardButtons = document.querySelectorAll(".keyboard-key");
    keyboardButtons.forEach(button => {
        button.disabled = false;
        button.addEventListener('click', function () {
            handleKeyClick(button.textContent);
        });
    });
    updateHangmanImage();
}
function showRestartMessage() {
    const restartMessage = document.getElementById("restart-message");
    restartMessage.style.display = "block";
}

function hideRestartMessage() {
    const restartMessage = document.getElementById("restart-message");
    restartMessage.style.display = "none";
}
function playSound(soundId) {
    const sound = document.getElementById(soundId);
    sound.currentTime = 0; // Rewind the sound to the beginning (in case it's already playing)
    sound.play();
}
const runHangmanButton = document.getElementById('runHangmanButton');

document.getElementById('runHangmanButton').addEventListener('click', function () {
    fetch('http://127.0.0.1:5000/run-hangman')
        .then(response => response.text())
        .then(text => alert(text))
        .catch(error => console.error('Error:', error));
});
window.onload = function () {
    // When the window is loaded, it creates the keyboard and initializes the game display.
    createKeyboard();
    initializeGameDisplay();

    // Sets up a global keyboard listener for the 'r' key to reset the game.
    document.addEventListener('keydown', function (event) {
        if (event.key.toLowerCase() === 'r') {
            resetGame();  // Resets the game if 'r' is pressed.
            hideRestartMessage();  // Hides any restart message shown.
        }
    });

}
