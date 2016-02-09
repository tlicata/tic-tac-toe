var Engine = require("../app/engine");

describe("The game engine", function () {

  var game;

  beforeEach(function () {
    game = Engine.createNewGame();
  });

  it("creates a new game", function () {
    // At a minimum.
    expect(game).toBeDefined();
  });

  it("takes a turn as a player", function () {
    // Each square (or position) in the tic-tac-toe board is
    // represented by a number (0-8).
    //
    // | 0 | 1 | 2 |
    // |---+---+---|
    // | 3 | 4 | 5 |
    // |---+---+---|
    // | 6 | 7 | 8 |

    // Let's try to take square #5.
    var square = 5;

    // Calling `play` will choose `square` as the current player's
    // move (if the square is available and the game is not over). It
    // will return a new game state with the updated board and the new
    // current player.
    var nextState = game.play(square);

    // Make sure the board has changed and the square we requested has
    // been updated to reflect our move.
    expect(game.playerAt(square)).not.toEqual(nextState.playerAt(square));
  });

  it("toggles players between turns", function () {
    // Square will be empty (since this is a brand new game).
    var noPlayer = game.playerAt(4);

    // The first player takes square #4.
    var stepOne = game.play(4);
    var firstPlayer = stepOne.playerAt(4);

    // The other player takes square #2.
    var stepTwo = stepOne.play(2);
    var secondPlayer = stepTwo.playerAt(2);

    // First player and second player should be different.
    // And both should be different from noPlayer.
    expect(noPlayer).not.toEqual(firstPlayer);
    expect(firstPlayer).not.toEqual(secondPlayer);
    expect(secondPlayer).not.toEqual(noPlayer);
  });

  it("prevents taking an already taken square", function () {
    // Let's pick on square #3.
    var square = 3;

    // It will be empty (since this is a brand new game).
    var noPlayer = game.playerAt(square);

    // Let's take it.
    var nextState = game.play(square);

    // We should occupy that square now.
    var ourPlayer = nextState.playerAt(square);
    expect(noPlayer).not.toEqual(ourPlayer);

    // The next player should not be able to steal it.
    var invalidMove = nextState.play(square);

    // Make sure we still occupy that square.
    expect(invalidMove.playerAt(square)).toEqual(ourPlayer);
  });

  it("detects a draw", function () {

    // | 0 | 1 | 2 |      | X | X | O |
    // |---+---+---|      |---+---+---|
    // | 3 | 4 | 5 |  ->  | O | O | X |
    // |---+---+---|      |---+---+---|
    // | 6 | 7 | 8 |      | X | O | X |

    var drawCombo = [0, // X plays top left square,
                     4, // O plays center square,
                     8, // X plays bottom right square,
                     3, // O plays middle left,
                     5, // X stops 0 win with middle right,
                     2, // O stops X win with top right,
                     6, // X stops 0 win with bottom left,
                     7, // O stops X win with bottom middle,
                     1];// X draws with top middle.

    var drawState = drawCombo.reduce(function (state, move) {
      expect(state.isOver()).toBe(false);
      return state.play(move);
    }, game);

    // In the case of a draw, .isOver() returns true (unlike in the
    // case of a win, when it returns an Array of the winning
    // combination).
    expect(drawState.isOver()).toBeTruthy();
    expect(drawState.isOver()).toBe(true);
  });

  it("detects a win", function () {
    var winCombo = [0, // X plays top left square,
                    4, // O plays center square,
                    1, // X plays top center square,
                    3, // O (foolishly) takes left middle,
                    2];// X wins with top right square.

    var winState = winCombo.reduce(function (state, move) {
      expect(state.isOver()).toBe(false);
      return state.play(move);
    }, game);

    // In the case of a win, .isOver() returns an Array of the square
    // positions that comprise the win. We allow this because Arrays
    // are truthy.
    expect(winState.isOver()).toBeTruthy();
    expect(winState.isOver()).toEqual([0,1,2]);
  });

  it("prevents further turns after a win", function () {
    // Grab an empty spot.
    var emptyIndex = 6;
    var emptyPlayer = game.playerAt(emptyIndex);

    // Same X winning combination as above.
    var winCombo = [0, 4, 1, 3, 2];
    var winState = winCombo.reduce(function (state, move) {
      return state.play(move);
    }, game);

    // Make sure the game is over and the square in question is empty.
    expect(winState.isOver()).toBeTruthy();
    expect(winState.playerAt(emptyIndex)).toEqual(emptyPlayer);

    // Try to take an empty square even though game is over.
    // Make sure we can't, and that the square is still empty.
    // Make sure game is still over, for good measure.
    var invalid = winState.play(emptyIndex);
    expect(invalid.playerAt(emptyIndex)).toEqual(emptyPlayer);
    expect(invalid.isOver()).toBeTruthy();
  });
});
