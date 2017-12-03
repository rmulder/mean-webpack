var express = require('express');
var router = new express.Router();
var Post = require('../models/posts.model');
// Home page route

router.get('/', function (req, res) {
  res.send('API');
});

//Add Posts
router.post('/posts', function (req, res) {
  var post = new Post();
  post.title = req.body.title;
  post.body = req.body.body;

  //save the post and check for errors
  post.save(function (err) {
    if (err) {
      res.send(err);
    }
    res.json({ message: 'Post Created Successfully' });
  });

});

//Show All Posts
router.get('/posts', function (req, res) {
  Post.find(function (err, posts) {
    if (err)
      res.send(err);

    res.json(posts);
  });
});

//Display a Post
router.get('/posts/:post_id', function (req, res) {
  Post.findById(req.params.post_id, function (err, post) {

    //Handle errors
    if (err) {
      res.send(err);
    }

    //Display the post
    res.json(post);
  });
});

//Edit or Update a Post

router.put('/posts/:post_id', function (req, res) {
  Post.findById(req.params.post_id, function (err, post) {
    //Handle errors
    if (err) {
      res.send(err);
    }

    //update the post

    post.title = req.body.title;
    post.body = req.body.body;

    //save the post 

    post.save(function (err) {

      //Handle Error

      if (err) {
        res.send(err);
      }

      res.json(
        {
          message: 'Post Successfully Updated'
        }
      )
    });

  });
});

//Delete a Post

router.delete('/posts/:post_id', function (req, res) {
  Post.remove({
    _id: req.params.post_id
  }, function (err, post) {
      //Handle Errors
      if (err) {
        res.send(err);
      }
      res.json(
        {
          message: 'Post Successfully Deleted'
        }
      );
    });

});


module.exports = router;