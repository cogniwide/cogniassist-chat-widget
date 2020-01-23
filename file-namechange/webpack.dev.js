const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // entry: ['babel-polyfill', './index.js'],
  entry: './index.js',
  
  output: {
    path: path.join(__dirname, '/lib'),
    filename: 'index.js',
    library: 'CogniAssistWidget',
    libraryTarget: 'umd'
  },
  devServer: {
    hot: true,
    inline: true,
    stats: 'errors-only',
    host: process.env.HOST, // Defaults to `localhost`
    port: process.env.PORT, // Defaults to 8080
    open: true, // Open the page in browser
    contentBase: path.resolve(__dirname, '/lib'),
    watchOptions: {
      poll: true
  }
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  mode: 'development',
  devtool: 'eval-source-map',
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.css$/,
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader' }
      ]
    }, {
      test: /\.(jpg|png|gif|svg)$/,
      use: {
        loader: 'url-loader'
      }
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Web Chat Widget Test',
      filename: 'index.html',
      inject: false,
      template: 'dev/src/index.html',
      showErrors: true
    })
  ]
};
