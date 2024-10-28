'use strict';

const MAX_PLAYERS = 4;
const MAX_POINTS = 4;

//
// Game Object
// Declare a const variable named game to hold an Object Literal that represents some theoretical game.
const game = {
  title: 'The Running Game',
  isRunning: false,
  players: [],
  activePlayer: 0,
  scoreBoard: document.getElementById('player-scores'),
  playerForm: document.getElementById('join-name'),
  joinGameButton: document.getElementById('join-game-button'),
  startGameButton: document.getElementById('game-control'),
  switchPlayerButton: document.getElementById('switch'),
  scorePointsButton: document.getElementById('score-points'),

  // Toggle the game isRunning property and apply a visual indication of the game's current state.
  // Toggle the button text
  //   "Start Game" -> "Pause Game" <-> "Resume Game"
  // Make sure that "Score Points" and "Switch Player" is only enabled when the game is running.
  toggleGame: function () {
    this.isRunning = !this.isRunning;

    if (this.isRunning) {
      this.startGameButton.innerText = 'Pause Game';
      this.switchPlayerButton.disabled = false;
      this.scorePointsButton.disabled = false;

      this.players[this.activePlayer].playerScoreboardContainer.classList.add(
        'active'
      );
    } else {
      this.startGameButton.innerText = 'Resume Game';
      this.switchPlayerButton.disabled = true;
      this.scorePointsButton.disabled = true;

      this.players[
        this.activePlayer
      ].playerScoreboardContainer.classList.remove('active');
    }
  },

  // Add a Player object to the gane players array, and to the scoreboard
  addPlayer(inPlayer) {
    // since players is indexed starting at 0, increment to get player number, i.e., index 0 is player 1
    var pNum = this.players.length + 1;

    // create the scoreboard container for the new player
    var newDiv = document.createElement('div');
    newDiv.setAttribute('id', 'player' + pNum + '-scoreboard');

    var newNameDiv = document.createElement('div');
    newNameDiv.setAttribute('id', 'p' + pNum + '-name');
    var textName = document.createTextNode(inPlayer.name);
    newNameDiv.appendChild(textName);

    var newScoreDiv = document.createElement('div');
    newScoreDiv.setAttribute('id', 'p' + pNum + '-scoreboard');
    var textScore = document.createTextNode(inPlayer.score);
    newScoreDiv.appendChild(textScore);

    newDiv.appendChild(newNameDiv);
    newDiv.appendChild(newScoreDiv);

    // append the new container to game scoreboard
    this.scoreBoard.appendChild(newDiv);

    // save a reference to the player's new scoreboard div
    inPlayer.playerScoreboardContainer = newDiv;

    // add player to game players array
    this.players.push(inPlayer);

    // if there are 2 or more players, enable game play
    if (this.players.length >= 2) {
      this.startGameButton.disabled = false;
    }

    // once the maximum number of players is reached, disable the join components
    if (this.players.length == MAX_PLAYERS) {
      this.joinGameButton.disabled = true;
      this.playerForm.disabled = true;
    }
  },

  // Update the player score on screen when the player scores points.
  updatePlayerScoreDisplay() {
    this.players[this.activePlayer].playerScoreboardContainer.querySelector(
      '[id$="-scoreboard"]'
    ).innerText = this.players[this.activePlayer].score;
  },

  // Rotate through the players, making each subsequent one the active player
  switchPlayers() {
    this.activePlayer = (this.activePlayer + 1) % this.players.length;

    for (var i = 0; i < this.players.length; i++) {
      if (i == this.activePlayer) {
        this.players[i].playerScoreboardContainer.classList.add('active');
      } else {
        this.players[i].playerScoreboardContainer.classList.remove('active');
      }
    }
  },
};

//
// Event Handlers
// Joining the game:
// Make sure that the player has entered something for the name. If not, display an alert with instructions.
// Take the entered name and create a Player object, then add the new Player to the game object.
game.joinGameButton.addEventListener('click', function () {
  if (game.playerForm.value.length == 0) {
    alert('Please enter a name before joining the game');
  } else {
    var newPlayer = new Player(game.playerForm.value);
    game.addPlayer(newPlayer);

    // clear the input textbox
    game.playerForm.value = '';
  }
});

game.startGameButton.addEventListener('click', function () {
  game.toggleGame();
});

game.switchPlayerButton.addEventListener('click', function () {
  game.switchPlayers();
});

// Randomly generate a score between 1-4 and use it to update the active player's score
game.scorePointsButton.addEventListener('click', function () {
  var pointsScored = Math.floor(Math.random() * MAX_POINTS) + 1;

  game.players[game.activePlayer].updateScore(pointsScored);
});

// Add the game's title to the header's heading
document.getElementById('game-title').innerText = game.title;

// Make sure the player name input box is empty
game.playerForm.value = '';

// Make sure that all game action buttons are disabled to start.
// They will be enabled once 2 players have joined the game.
game.startGameButton.disabled = true;
game.switchPlayerButton.disabled = true;
game.scorePointsButton.disabled = true;

//
// Player Class
class Player {
  constructor(inName) {
    this.name = inName;
    this.score = 0;
    this.playerScoreboardContainer = null;
  }

  // Update the player's score and refrect the new score on the scoreboard
  updateScore(inPoints) {
    this.score += inPoints;
    game.updatePlayerScoreDisplay();
  }
}
