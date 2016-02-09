var React = require("react");
var ReactDOM = require("react-dom");
var ReactTestUtils = require('react-addons-test-utils');
var Hello = require("../app/hello");

describe("Hello Component", function() {
  it("should greet our person", function() {
    var container = document.createElement("div");
    var instance = ReactTestUtils.renderIntoDocument(React.createElement(Hello, {name: "World!"}));
    var hello = ReactTestUtils.findRenderedDOMComponentWithTag(instance, "div");
    expect(ReactDOM.findDOMNode(hello).textContent).toBe("Hello, World!");
  });
});
