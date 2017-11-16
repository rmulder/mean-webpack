var webpack = require('webpack');
var path = require('path');

module.exports = {
    context: path.join(__dirname,'src'),
    entry:{ 
      app: './app/app.js'
    },
    output: {
      path: path.join(__dirname,'dist'),
      filename: '[name].bundle.js'
    }
}; 