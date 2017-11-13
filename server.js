var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var favicon = require('serve-favicon');
var path = require('path');

//Initialize the express app
const app = express();

//Favicon 
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//Morgan for logging 
app.use(logger('dev'));

 // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({'extended':'true'}));   
 // parse application/json
app.use(bodyParser.json());                                     
// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

//Initialize the port for the app to run 
var port = process.env.PORT || 3000;

//Configure Mongoose for Mongodb 
var mongoDB = 'mongodb://localhost:27017/mydb';
mongoose.connect(mongoDB,{
    useMongoClient: true,
    /* other options */
  });
  //Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Serving the static files
app.use(express.static(path.join(__dirname,'public')));   
app.use('/assets', express.static(path.join(__dirname,'/node_modules')));

// load the single view file (angular will handle the page changes on the front-end)
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname,'public','index.html')); 
});

// you can use the Schemas and Models here 
var Schema = mongoose.Schema;


//Start the App
app.listen(port, function(){
   console.log("App running at http://localhost:" + port); 
});

