module.exports = {
  entry: "./index.js",
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      query: {
        presets: ['react']
      }
    }, {
      test: /\.css$/,
      loader: "style-loader!css-loader"
    }]
  }
};
