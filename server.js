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

app.use(logger('dev'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
  'extended': 'true'
}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});
app.use(express.static(path.join(__dirname, 'public')));

app.set('JWT_SECRET', 'SecretKey');

//models
var User = require('./models/User.js');

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/views/index.html');
  console.log('App initialized');
});

//API
app.post('/signin', function(req, res) {
  User.findOne({
    email: req.body.email,
    password: req.body.password
  }, function(err, user) {
    if (err) {
      res.json({
        type: false,
        data: "Error occured: " + err
      });
    } else {
      if (user) {
        res.json({
          type: true,
          data: user,
          token: user.token
        });
      } else {
        res.json({
          type: false,
          data: "Incorrect email/password"
        });
      }
    }
  });
});

app.post('/signup', function(req, res) {
  User.findOne({
    email: req.body.email,
    password: req.body.password
  }, function(err, user) {
    if (err) {
      res.json({
        type: false,
        data: "Error occured: " + err
      });
    } else {
      if (user) {
        res.json({
          type: false,
          data: "User already exists!"
        });
      } else {
        var userModel = new User();
        userModel.email = req.body.email;
        userModel.password = req.body.password;
        userModel.save(function(err, user) {
          var payload = {
            id: user.id
          };
          user.token = jwt.sign(payload, 'mysecret', {
            expiresIn: '1h'
          });
          user.save(function(err, user1) {
            res.json({
              type: true,
              data: user1,
              token: user1.token
            });
          });
        })
      }
    }
  });
});

function ensureAuthorized(req, res, next) {
  var bearerToken;
  var bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== 'undefined') {
    var bearer = bearerHeader.split(" ");
    bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

app.get('/me', ensureAuthorized, function(req, res) {
  User.findOne({
    token: req.token
  }, function(err, user) {
    if (err) {
      res.json({
        type: false,
        data: "Error occured: " + err
      });
    } else {
      res.json({
        type: true,
        data: user
      });
    }
  });
});

process.on('uncaughtException', function(err) {
  console.log(err);
});

app.listen(port);
console.log('App Started at http://localhost:%d', port);

// expose app
exports = module.exports = app;
