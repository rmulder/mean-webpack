var webpack = require('webpack');
var path = require('path');

module.exports = {
    
    entry: path.join(__dirname,'public','app.js'),
    output: {
      path: path.join(__dirname,'public','dist'),
      filename: 'bundle.js'
    }
}; 