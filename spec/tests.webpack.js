require("babel-polyfill");

// Single entry point for tests. See:
// https://github.com/webpack/karma-webpack#alternative-usage
var context = require.context('.', true, /_spec\.js$/);
context.keys().forEach(context);
