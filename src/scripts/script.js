'use strict';

//
// Player Objects
// Declare const variables holding an Object, this time representing each player:
const player1 = {
  name: '',
  score: 0,
  playerScoreboardContainer: document.getElementById('player1-scoreboard'),

  // update the player name property in the player object itself, then call the method in the game object
  // to handle updating the DOM.
  // Also, disable the join button and the Name textbox
  updatePlayerName(inName) {
    console.log('start updatePlayerName with ' + inName);
    player1.name = inName;
    game.updatePlayerNameDisplay(1, inName);
    game.p1JoinGameButton.disabled = true;
    game.p1PlayerForm.disabled = true;
    console.log('end updatePlayerName: name = ' + player1.name);
  },

  // increment the player's score property, then call the relevant game object method to update the DOM
  updatePlayerScore() {
    player1.score += 1;
    game.updatePlayerScoreDisplay(1, player1.score);
  },
};

const player2 = {
  name: '',
  score: 0,
  playerScoreboardContainer: document.getElementById('player2-scoreboard'),

  // update the player name property in the player object itself, then call the method in the game object
  // to handle updating the DOM.
  // Also, disable the join button and the Name textbox
  updatePlayerName(inName) {
    console.log('start updatePlayerName with ' + inName);
    player2.name = inName;
    game.updatePlayerNameDisplay(2, inName);
    game.p2JoinGameButton.disabled = true;
    game.p2PlayerForm.disabled = true;
    console.log('end updatePlayerName: name = ' + player2.name);
  },

  // increment the player's score property, then call the relevant game object method to update the DOM
  updatePlayerScore() {
    player2.score += 1;
    game.updatePlayerScoreDisplay(2, player2.score);
  },
};

//
// Game Object
// Declare a const variable named game to hold an Object Literal that represents some theoretical game.
const game = {
  title: 'The Running Game',
  isRunning: false,
  players: [],
  activePlayer: 0,
  gameBoard: document.getElementById('gameboard'),
  scoreBoard: document.getElementById('scoreboard'),
  p1NameDisplay: document.getElementById('p1-name'),
  p2NameDisplay: document.getElementById('p2-name'),
  p1ScoreDisplay: document.getElementById('p1-score'),
  p2ScoreDisplay: document.getElementById('p2-score'),
  joinGame: document.getElementById('join-game'),
  p1PlayerForm: document.getElementById('p1-join-name'),
  p2PlayerForm: document.getElementById('p2-join-name'),
  p1JoinGameButton: document.getElementById('p1-join-game-button'),
  p2JoinGameButton: document.getElementById('p2-join-game-button'),
  startGameButton: document.getElementById('game-control'),
  switchPlayerButton: document.getElementById('switch'),
  scorePointsButton: document.getElementById('score-points'),

  // Toggle the game is running property and apply a visual indication of the game's current state.
  // Also, toggle the button text "Start Running" <-> "Stop Running", and make sure that "Score a point"
  // is only enabled once the game has started.
  toggleGame: function () {
    game.isRunning = !game.isRunning;

    if (game.isRunning) {
      game.startGameButton.innerText = 'Pause Game';
      game.switchPlayerButton.disabled = false;
      game.scorePointsButton.disabled = false;

      game.players[
        game.activePlayer
      ].playerScoreboardContainer.style.background = 'aqua';
    } else {
      game.startGameButton.innerText = 'Resume Game';
      game.switchPlayerButton.disabled = true;
      game.scorePointsButton.disabled = true;

      game.players[
        game.activePlayer
      ].playerScoreboardContainer.style.background = 'white';
    }
  },

  // Update the player's name on screen based on a parameter named playerName.
  updatePlayerNameDisplay(playerNumber, playerName) {
    playerNumber--;

    if (playerNumber == 0) {
      game.p1NameDisplay.innerText = playerName;
    } else {
      game.p2NameDisplay.innerText = playerName;
    }
  },

  // Update the player score on screen when the player scores points (via click on the scorePointsButton, for now).
  updatePlayerScoreDisplay(playerNumber, playerScore) {
    playerNumber--;

    if (playerNumber == 0) {
      game.p1ScoreDisplay.innerText = playerScore;
    } else {
      game.p2ScoreDisplay.innerText = playerScore;
    }
  },

  switchPlayers() {
    game.activePlayer = game.activePlayer == 0 ? 1 : 0;

    game.players[game.activePlayer].playerScoreboardContainer.style.background =
      'aqua';

    if (game.activePlayer == 0) {
      game.players[1].playerScoreboardContainer.style.background = 'white';
    } else {
      game.players[0].playerScoreboardContainer.style.background = 'white';
    }
  },

  isGameReadyToStart() {
    if (player1.name != '' && player2.name != '') {
      console.log(
        'both names have been entered: ' + player1.name + ' ' + player2.name
      );

      game.joinGame.style.display = 'none';
      game.startGameButton.disabled = false;
    } else {
      console.log(
        'both names have not been entered: ' + player1.name + ' ' + player2.name
      );
    }
  },
};

//
// Event Handlers
// Joining the game:
// Make sure that the player has entered something for the name. If not, display an alert with instructions.
// Take the entered name and (1) update the player object, (2) update the scoreboard, and (3) make sure that
// the Start Running button is now enabled.
game.p1JoinGameButton.addEventListener('click', function () {
  if (game.p1PlayerForm.value.length == 0) {
    alert('Please enter a name before joining the game');
  } else {
    player1.updatePlayerName(game.p1PlayerForm.value);
    game.isGameReadyToStart();
  }
});

game.p2JoinGameButton.addEventListener('click', function () {
  if (game.p2PlayerForm.value.length == 0) {
    alert('Please enter a name before joining the game');
  } else {
    player2.updatePlayerName(game.p2PlayerForm.value);
    game.isGameReadyToStart();
  }
});

game.startGameButton.addEventListener('click', function () {
  game.toggleGame();
});

game.switchPlayerButton.addEventListener('click', function () {
  game.switchPlayers();
});

game.scorePointsButton.addEventListener('click', function () {
  if (game.activePlayer == 0) {
    player1.updatePlayerScore();
  } else {
    player2.updatePlayerScore();
  }
});

// add the game's title to the header's heading
document.getElementById('game-title').innerText = game.title;

// make sure the player name input boxes are empty
game.p1PlayerForm.value = '';
game.p2PlayerForm.value = '';

// make sure that all game action buttons are disabled to start.
// They will be enabled post joining the game.
game.startGameButton.disabled = true;
game.switchPlayerButton.disabled = true;
game.scorePointsButton.disabled = true;

game.players[0] = player1;
game.players[1] = player2;
