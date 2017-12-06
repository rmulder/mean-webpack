var express = require('express');
var router = new express.Router();
var Log = require('../models/logs.model');
// Home page route

router.get('/', function (req, res) {
  res.send('API');
});

//Add Logs
router.post('/logs', function (req, res) {
  var log = new Log();
  log.title = req.body.title;
  log.body = req.body.body;

  //save the post and check for errors
  log.save(function (err) {
    if (err) {
      res.send(err);
    }
    res.json({
      message: 'Log Created Successfully'
    });
  });

});

//Show All Logs
router.get('/logs', function (req, res) {
  Log.find(function (err, logs) {
    if (err)
      res.send(err);

    res.json(logs);
  });
});

//Display a Log
router.get('/logs/:log_id', function (req, res) {
  Log.findById(req.params.log_id, function (err, log) {

    //Handle errors
    if (err) {
      res.send(err);
    }

    //Display the post
    res.json(log);
  });
});

//Edit or Update a Log

router.put('/logs/:log_id', function (req, res) {
  Log.findById(req.params.log_id, function (err, log) {
    //Handle errors
    if (err) {
      res.send(err);
    }

    //update the post

    log.title = req.body.title;
    log.body = req.body.body;

    //save the post 

    log.save(function (err) {

      //Handle Error

      if (err) {
        res.send(err);
      }

      res.json({
        message: 'Log Successfully Updated'
      })
    });

  });
});

//Delete a Log

router.delete('/logs/:log_id', function (req, res) {
  Log.remove({
    _id: req.params.log_id
  }, function (err, log) {
    //Handle Errors
    if (err) {
      res.send(err);
    }
    res.json({
      message: 'Log Successfully Deleted'
    });
  });

});


module.exports = router;