var React = require("react");
var ReactDOM = require("react-dom");
var ReactTestUtils = require('react-addons-test-utils');
var Board = require("../app/board");

describe("The board view", function () {

  var instance;

  beforeEach(function () {
    instance = ReactTestUtils.renderIntoDocument(React.createElement(Board));
  });

  var getAllSquares = function () {
    return ReactTestUtils.scryRenderedDOMComponentsWithClass(instance, "square");
  };
  var getSquare = function (num) {
    return ReactTestUtils.findRenderedDOMComponentWithClass(instance, "square" + num);
  };

  it("shows nine squares", function () {
    expect(getAllSquares().length).toEqual(9);
  });

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
});
