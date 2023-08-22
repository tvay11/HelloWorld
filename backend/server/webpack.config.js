const path = require('path');
const nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: './server.js',
  target: 'node',
  node: {
    // Need this when working with express, otherwise the build fails
    __dirname: false,
    __filename: false,  
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};
