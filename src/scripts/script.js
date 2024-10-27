'use strict';

//
// Game Object
// Declare a const variable named game to hold an Object Literal that represents some theoretical game.
const game = {
  title: 'The Running Game',
  isRunning: false,
  gameBoard: document.getElementById('gameboard'),
  scoreBoard: document.getElementById('scoreboard'),
  playerForm: document.getElementById('player-name'),
  joinGameButton: document.getElementById('join-game-button'),
  startGameButton: document.getElementById('p1-run'),
  scorePointsButton: document.getElementById('p1-points'),
  playerNameDisplay: document.getElementById('p1-name'),
  playerScoreDisplay: document.getElementById('p1-score'),
  runningStatusImage: document.getElementById('running-status-image'),

  // Toggle the game is running property and apply a visual indication of the game's current state.
  // Also, toggle the button text "Start Running" <-> "Stop Running", and make sure that "Score a point"
  // is only enabled once the game has started.
  toggleGame: function () {
    game.isRunning = !game.isRunning;

    if (game.isRunning) {
      game.runningStatusImage.src = './images/A stick figure running.png';
      game.startGameButton.innerText = 'Stop Running';
      game.scorePointsButton.disabled = false;
    } else {
      game.runningStatusImage.src =
        './images/A stick figure standing still.png';
      game.startGameButton.innerText = 'Start Running';
      game.scorePointsButton.disabled = true;
    }
  },

  // Update the player's name on screen based on a parameter named playerName.
  updatePlayerNameDisplay(playerName) {
    game.playerNameDisplay.innerText = playerName;
  },

  // Update the player score on screen when the player scores points (via click on the scorePointsButton, for now).
  updatePlayerScoreDisplay(inScore) {
    game.playerScoreDisplay.innerText = inScore;
  },
};

//
// Player Object
// Declare another const variable holding an Object, this time representing the player:
const player = {
  name: '',
  score: 0,

  // update the player name property in the player object itself, then call the method in the game object
  // to handle updating the DOM.
  // Also, disable the join button and the Name textbox
  updatePlayerName(inName) {
    console.log('start updatePlayerName');
    player.name = inName;
    game.updatePlayerNameDisplay(inName);
    game.joinGameButton.disabled = true;
    game.playerForm.disabled = true;
    console.log('end updatePlayerName: name = ' + player.name);
  },

  // increment the player's score property, then call the relevant game object method to update the DOM
  updatePlayerScore() {
    player.score += 1;
    game.updatePlayerScoreDisplay(player.score);
  },
};

//
// Event Handlers
// Joining the game:
// Make sure that the player has entered something for the name. If not, display an alert with instructions.
// Take the entered name and (1) update the player object, (2) update the scoreboard, and (3) make sure that
// the Start Running button is now enabled.
game.joinGameButton.addEventListener('click', function () {
  if (game.playerForm.value.length == 0) {
    alert('Please enter a name before joining the game');
  } else {
    player.updatePlayerName(game.playerForm.value);
    game.playerScoreDisplay.innerText = player.score;
    game.startGameButton.disabled = false;
  }
});

game.startGameButton.addEventListener('click', function () {
  game.toggleGame();
});

game.scorePointsButton.addEventListener('click', function () {
  player.updatePlayerScore();
});

// add the game's title to the header's heading
document.getElementById('game-title').innerText = game.title;

// make sure the player name input box is empty
game.playerForm.value = '';

// make sure that the Start Running and Score a Point buttons are disabled to start.
// They will be enabled post joining the game.
game.startGameButton.disabled = true;
game.scorePointsButton.disabled = true;
