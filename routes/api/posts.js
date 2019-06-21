// dependencies
const express = require('express');
const passport = require('passport');

const router = express.Router();

// Models
const User = require('../../models/Users');
const Blogpost = require('../../models/Posts');

// Get user's comments
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.findById(req.user.id, (err, user) => {
      if (!user) {
        console.log(err);
        return res.status(404).json({ error: 'User not found' });
      }

      // grabs ALL posts in collection
      // TODO: redesign Models so that I can find only
      // the current user's posts
      Blogpost.find({}, (err, post) => {
        if(err) {
          console.log(err);
          return res.status(404).json('error');
        }
        // filter out posts not belonging to current user
        const posts = post.filter(p => p.author.username === req.user.username);
        res.json(posts);
      })
    });
  }
);

// Create a new blog post
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  User.findById(req.user.id, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: err});
    }

    const newPost = new Blogpost({
      text: req.body.post,
      author: {
        username: req.user.username
      }
    });

    newPost
      .save()
      .then(post => {
        console.log(post);
        user.blogPosts.push(post);
        user.save();
        res.status(200).json(post);
      })
      .catch(err => console.log(err));

    
    
  });
});

module.exports = router;
