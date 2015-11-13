var path = require("path");
var webpack = require("webpack");

module.exports = {

  output: {
    pathinfo: true,
    path: path.resolve(__dirname, "dist/"),
    filename: "bundle.js",
    publicPath: "dist/"
  },

  entry: [
      "./src/index.js"
  ],

  module: {
    loaders: [
        {
          test: /(\.jsx)|(\.js)$/,
          include: path.join(__dirname, "src"),
          loader: "react-hot-loader!babel-loader"
        }
    ],
  },

  plugins: [
    new webpack.NoErrorsPlugin()
  ],

  cache: true,
  debug: true,
  devtool: "source-map",

  stats: {
    timings: true,
    colors: true,
    reasons: true
  },

  resolve: {
    extensions: ["", ".js", ".jsx"],
    modulesDirectories: ["node_modules"],
  },

};
