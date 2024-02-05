const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // entry: ['babel-polyfill', './index.js'],
  entry: "./index.js",
  output: {
    path: path.join(__dirname, "/lib"),
    filename: "index.js",
    library: "CogniAssistWidget",
    libraryTarget: "umd",
  },
  devServer: {
    hot: true,
    host: '0.0.0.0',
    port: process.env.PORT || 5000,
    open: true,
    static: {
      directory: path.resolve(__dirname, 'lib'),
    },
    watchFiles: ['src'],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  mode: "development",
  devtool: "eval-source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.(css|scss)$/,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/",
            },
          },
        ],
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: {
          loader: "url-loader",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Web Chat Widget Test",
      filename: "index.html",
      inject: false,
      template: "dev/src/index.html",
      showErrors: true,
    }),
  ],
};
