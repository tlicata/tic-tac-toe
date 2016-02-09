var React = require("react");
var ReactDOM = require("react-dom");
var ReactTestUtils = require('react-addons-test-utils');
var Board = require("../app/board");

describe("Board View", function() {
  it("should greet our person", function() {
    var container = document.createElement("div");
    var instance = ReactTestUtils.renderIntoDocument(React.createElement(Board));
    var hello = ReactTestUtils.findRenderedDOMComponentWithTag(instance, "div");
    expect(ReactDOM.findDOMNode(hello).textContent).toBe("Hello");
  });
});
