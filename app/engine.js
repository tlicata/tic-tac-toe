// This is the tic-tac-toe engine, the game logic, the brain of our
// application. It contains no view code and does not assume
// responsibility for displaying a game to the user.

// The board data is stored as a 9-element array with each index
// representing a spot on the board as follows:
//
// | 0 | 1 | 2 |
// |---+---+---|
// | 3 | 4 | 5 |
// |---+---+---|
// | 6 | 7 | 8 |
//
// The main entry point is the `createNewGame` function. It returns a
// new game object that provides a few methods:
//
// - play(square):
//     Claims the given square as the next player's turn.
// - playerAt(index)
//     Given an index, return the player who occupies that square.
// - isOver()
//     Returns information about the state of the game.
//
// The rest of the functions exist to help us get there.

// The players are represented by the following variables.
var X = "X";
var O = "0";
var EMPTY = " ";

// These are all the possible arrangements of a win. If a player
// occupies one of the combinations (say, squares [0,1,2]) then they
// win.
var WIN_COMBOS = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // cols
  [0,4,8], [2,4,6]           // diags
];

// Return the next player.
var togglePlayer = function (who) {
  return who === X ? O : X;
};

// Is a given square in the valid range?
var validIndex = function (square) {
  return square >= 0 && square < 9;
};

// Is a square unoccupied and available to be taken?
var squareAvailable = function (board, square) {
  return validIndex(square) && (board[square] === EMPTY);
};

// Returns the first winning combination, if there is one. Returns
// `undefined` otherwise. Returning the winning combination allows the
// view to highlight it for the players. Uses ES6's
// `Array.prototype.find`, which required `babel-polyfill`.
var whoWon = function (board) {
  return WIN_COMBOS.find(function (combo) {
    return board[combo[0]] !== EMPTY &&
      board[combo[0]] === board[combo[1]] &&
      board[combo[0]] === board[combo[2]];
  });
};

// Are all of the squares on the board taken (indicating game over,
// either a win or a draw)?
var isBoardFull = function (board) {
  return board.every(function (square) {
    return square !== EMPTY;
  });
};

// The main game object that is passed to the view. Given a board and
// a player, it provides only a few methods.
var game = function (board, player) {
  return {
    // The main method that advances the game. Given a square, it
    // tries to acquire that position for the current player. It first
    // has to check that the game is not over and that the square is
    // available. It returns a new game object representing the new
    // state if the move is valid.
    play: function (square) {
      if (this.isOver(board) || !squareAvailable(board, square)) {
        // If the move is invalid, don't advance the state.
        return this;
      } else {
        // If the move is valid, update the board with the acquired
        // spot and switch whose turn it is.
        var newBoard = board.map(function (oldVal, idx) {
          return square === idx ? player : oldVal;
        });
        return game(newBoard, togglePlayer(player));
      }
    },

    // Returns the player that occupies the square at the given index.
    playerAt: function (idx) {
      return validIndex(idx) ? board[idx] : null;
    },

    // Determine if the game is over. Returns:
    //  - false, if the game is in progress.
    //  - true, if the game has ended in a draw.
    //  - an array, of the winning squares, if a win has occurred.
    isOver: function () {
      return whoWon(board) || isBoardFull(board);
    },

    // A convenience method for the view to display a message to the
    // players about the current state of the game.
    message: function () {
      var status = this.isOver();
      if (!status) {
        return "In progress";
      } else if (Array.isArray(status)) {
        return this.playerAt(status[0]) + " wins!";
      } else {
        return "A tie!";
      }
    }
  }
};

module.exports = {
  // Starts a new game. It chooses X as the first player and
  // initializes an empty board before returning a new game object
  // representing both (probably to the view).
  createNewGame: function () {
    var initialPlayer = X;
    var emptyBoard = [EMPTY,EMPTY,EMPTY,
                      EMPTY,EMPTY,EMPTY,
                      EMPTY,EMPTY,EMPTY];
    return game(emptyBoard, initialPlayer);
  }
};
