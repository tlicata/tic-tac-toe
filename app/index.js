var React = require("react");
var ReactDOM = require("react-dom");
var Hello = require("./hello");

require("./styles.scss");

ReactDOM.render(
  React.createElement(Hello, {name: "World!"}),
  document.getElementById("container")
);
