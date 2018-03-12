var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var webpack = require('webpack');
var mongoose = require('mongoose');
var favicon = require('serve-favicon');
var path = require('path');
var jwt = require('jsonwebtoken');
var port = process.env.PORT || 4000;
var database = require('./config/db.js');
var app = express();
//db configuration ===============================================================
mongoose.connect(database.localUrl, {
  useMongoClient: true
}); // Connect to local MongoDB instance.
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// app.set('superSecret', auth.secret);
app.use(logger('dev'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
  'extended': 'true'
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.get('*', function(req,res){
  res.sendFile(__dirname + '/public/views/index.html');
  console.log('App initialized');
});
app.listen(port);
console.log('App Started at http://localhost:%d', port);

// expose app
exports = module.exports = app;
