var React = require("react");
var ReactDOM = require("react-dom");
var ReactTestUtils = require('react-addons-test-utils');
var Board = require("../app/board");

// Test the UI of our game. This suite uses React's Test Utilities
// (https://facebook.github.io/react/docs/test-utils.html) for driving
// the UI. It can inspect the content of DOM nodes and simulate click
// events on them as well.

describe("The board view", function () {

  // Holds the React instance of our board view.
  var instance;

  // Create a new React component (our game board) for each test.
  beforeEach(function () {
    instance = ReactTestUtils.renderIntoDocument(React.createElement(Board));
  });

  // Helper functions for grabbing all the squares, a specific square,
  // or the the restart button (as React components).
  var getAllSquares = function () {
    return ReactTestUtils.scryRenderedDOMComponentsWithClass(instance, "square");
  };
  var getSquare = function (num) {
    return ReactTestUtils.findRenderedDOMComponentWithClass(instance, "square" + num);
  };
  var getRestartView = function () {
    return ReactTestUtils.findRenderedDOMComponentWithClass(instance, "restart");
  };
  var getRestartButton = function () {
    return ReactTestUtils.findRenderedDOMComponentWithTag(instance, "button");
  };

  // Our game should generate nine squares on the board.
  it("shows nine squares", function () {
    expect(getAllSquares().length).toEqual(9);
  });

  // Players should be able to claim empty squares by clicking.
  it("lets a player click an empty square", function () {
    var squareComponent = getSquare(0);
    var squareDOM = ReactDOM.findDOMNode(squareComponent);

    // Make sure square is empty.
    expect(squareDOM.textContent).toEqual(" ");

    // Simulate a click.
    ReactTestUtils.Simulate.click(squareComponent);

    // Make sure square is no longer empty.
    expect(squareDOM.textContent).not.toEqual(" ");
  });

  // Wins should be highlighted visually.
  it("highlights a win", function () {

    var winCombo = [0, // X plays top left square,
                    4, // O plays center square,
                    1, // X plays top center square,
                    3, // O (foolishly) takes left middle,
                    2];// X wins with top right square.


    // Click all the squares in winCombo.
    winCombo.forEach(function (index) {
      ReactTestUtils.Simulate.click(getSquare(index));
    });

    // The winning squares should now be highlighted.
    [0,1,2].forEach(function (index) {
      var dom = ReactDOM.findDOMNode(getSquare(index));
      expect(dom.classList.contains("winner")).toBe(true);
    });

    // The rest should not.
    [3,4,5,6,7,8].forEach(function (index) {
      var dom = ReactDOM.findDOMNode(getSquare(index));
      expect(dom.classList.contains("winner")).toBe(false);
    });
  });

  // Restart button is shown once game is over (but not before).
  // And clicking it indeed restarts the game.
  describe("restart button", function () {

    var restartIsHidden = function () {
      var restart = ReactDOM.findDOMNode(getRestartView());
      return restart.classList.contains("hidden");
    };

    var playCombo = function (moves) {
      moves.forEach(function (index) {
        ReactTestUtils.Simulate.click(getSquare(index));
      });
    };

    it("is hidden during the game", function () {
      expect(restartIsHidden()).toBe(true);
    });
    it("appears after a tie", function () {
      var draw = [0,4,8,3,5,2,6,7,1];
      playCombo(draw);
      expect(restartIsHidden()).toBe(false);
    });
    it("appears after a win", function () {
      var win = [0,4,1,3,2];
      playCombo(win);
      expect(restartIsHidden()).toBe(false);
    });
    it("restarts the game when clicked", function () {
      // Play a game till it's over.
      var gameOver = [0,4,1,3,2];
      playCombo(gameOver);

      // Verify the restart button is there and click it.
      expect(restartIsHidden()).toBe(false);
      ReactTestUtils.Simulate.click(getRestartButton());

      // It should now have disappeared again.
      expect(restartIsHidden()).toBe(true);
      // And the board (i.e., each square) should be empty.
      getAllSquares().forEach(function (square) {
        expect(ReactDOM.findDOMNode(square).textContent).toEqual(" ");
      });
    });
  });
});
