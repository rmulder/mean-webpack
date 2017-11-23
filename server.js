var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
//var mongoose = require('mongoose');
var favicon = require('serve-favicon');
var path = require('path');

//Initialize the express app
const app = express();

//Favicon 
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//Morgan for logging 
app.use(logger('dev'));

//Cookie-parser parses Cookie header and populate req.cookies with an object keyed by the cookie names
app.use(cookieParser());

 // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({'extended':'true'}));   
 // parse application/json
app.use(bodyParser.json());                                     
// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

//Initialize the port for the app to run 
var port = process.env.PORT || 3000;

//Configure Mongoose for Mongodb 
//var mongoDB = 'mongodb://localhost:27017/mydb';
//mongoose.connect(mongoDB,{
  //  useMongoClient: true,
    /* other options */
 // });
  //Get the default connection
//var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
//db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Serving the static files
app.use(express.static(path.join(__dirname,'public')));   
app.use('/assets', express.static(path.join(__dirname,'/node_modules')));
app.use(express.static(path.join(__dirname,'dist')));

// load the single view file (angular will handle the page changes on the front-end)
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname,'public','index.html')); 
});

// you can use the Schemas and Models here 
//var Schema = mongoose.Schema;


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
  
  
//Start the App
var server = app.listen(port, function(){

  console.log('APP listening at http://localhost:%s', port);
});

