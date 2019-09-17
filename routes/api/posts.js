// dependencies
const express = require('express');
const passport = require('passport');

const router = express.Router();

// Models
const User = require('../../models/Users');
const Blogpost = require('../../models/Posts');

/////////////////////////////////////////////////////////////////////////
// ENDPOINTS
////////////////////////////////////////////////////////////////////////

// Get user's blog posts
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.findById(req.user.id, (err, user) => {
      if (err) {
        console.log(err);
        return res.status(404).json({ error: 'User not found' });
      }

      // grabs ALL of user's posts in collection
      Blogpost.find({ 'author.username': `${user.username}` }, (err, post) => {
        if (err) {
          console.log(err);
          return res.status(404).json('error');
        }
        // return posts as json
        res.status(200).json(post);
      });
    });
  }
);

// Create a new blog post
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.findById(req.user.id, (err, user) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ error: err });
      }
      const newPost = new Blogpost({
        title: req.body.title,
        text: req.body.post,
        author: {
          username: req.user.username,
        },
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
  }
);

// Update blog post route
router.put(
  '/:post_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // find Blogpost and update it
    Blogpost.findOneAndUpdate(
      { _id: { $eq: req.params.post_id } },
      { $set: { title: req.body.title, text: req.body.post } },
      (err, post) => {
        if (err) {
          console.log(err);
          return res
            .status(400)
            .json({ error: 'Something went wrong with the update' });
        }
        res.status(200).json({ msg: 'Blogpost updated' });
      }
    );
  }
);

// Delete blog post route
router.delete(
  '/:post_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // find post with id = post_id and delete it
    Blogpost.findOneAndDelete(
      { _id: { $eq: req.params.post_id } },
      (err, post) => {
        if (err) {
          console.log(err);
          return res.status(400).json({ error: err });
        }
        res.status(200).json(`deleted post ${post.id}`);
      }
    );
  }
);

module.exports = router;
