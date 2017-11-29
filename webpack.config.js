var webpack = require('webpack');
var path = require('path');

module.exports = {
    context: path.join(__dirname,'client'),
    entry:{ 
      app: './app.js'
    },
    output: {
      path: path.join(__dirname,'dist'),
      filename: '[name].bundle.js'
    },
    module: {
      rules: [
             {
               test: /\.js$/,
               exclude: /node_modules/,
               loader: ['babel-loader']
             }
            ]
     }
}; 