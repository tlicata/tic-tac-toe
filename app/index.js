// The main entry point for our app. It brings in React,
// babel-polyfill (for ES6 features), our SCSS, and our Board
// component. It renders two boards onto the page.

var React = require("react");
var ReactDOM = require("react-dom");
var Board = require("./board");

require("babel-polyfill");
require("./styles.scss");

ReactDOM.render(
  React.createElement(Board),
  document.getElementById("container-one")
);

ReactDOM.render(
  React.createElement(Board),
  document.getElementById("container-two")
);
