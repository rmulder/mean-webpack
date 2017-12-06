var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var webpack = require('webpack');
var mongoose = require('mongoose');
var favicon = require('serve-favicon');
var path = require('path');

//Initialize the express app
var app = express();


//Include our DB Connection Information
//var dblocalUrl = 'mongodb://localhost:27017/blog';
var database = require('./config/db.js');

// configuration ===============================================================
mongoose.connect(database.localUrl, {
  useMongoClient: true
}); 	// Connect to local MongoDB instance.

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)

db.on('error', console.error.bind(console, 'MongoDB connection error:'));


//Morgan for logging 
app.use(logger('dev'));

//Favicon 
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//Cookie-parser parses Cookie header and populate req.cookies with an object keyed by the cookie names
app.use(cookieParser());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
// parse application/json
app.use(bodyParser.json());

//Initialize the port for the app to run 
var port = process.env.PORT || 4000;

//Serving the static files
app.use(express.static(path.join(__dirname, 'public')));

app.use('/assets', express.static(path.join(__dirname, '/node_modules')));

// routes ======================================================================

// Defining our routes
var logs = require('./app/routes/logs.routes.js');

//use /api before  
app.use('/api', logs);

// load the single view file (angular will handle the page changes on the front-end)
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname,'public', 'index.html'));
});

//Handle 404 ( Not Found )
app.use(function (req, res, next) {
  console.log('API Response :');
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//Start the App
var server = app.listen(port, function () {

  console.log('APP listening at http://localhost:%s', port);
});

