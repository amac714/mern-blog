// USERS API

// dependencies
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

const router = express.Router();

// load input validation
const validateResgisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// load User Model
const User = require('../../models/Users');

/////////////////////////////////////////////////////////////////////////
// ENDPOINTS
////////////////////////////////////////////////////////////////////////

// new user registration route
router.post('/register', (req, res) => {

  // Form validation
  const { errors, isValid } = validateResgisterInput(req.body);
  
  if(!isValid) {
    return res.status(400).json(errors);
  }

  // check if username already exists in db then create new user
  User.findOne({ username: req.body.username }).then(user => {
    if(user) {
      return res.status(400).json({ username: 'Username already exists' });
    } else {
      const newUser = new User ({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password
      });

      // hash password
      bcrypt.genSalt(10, (error, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash)=> {
          if(err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.status(200).json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// user login route, returns jwt_token
router.post('/login', (req, res) => {
  // form validation
  const { errors, isValid } = validateLoginInput(req.body);

  if(!isValid) {
    return res.status(400).json(errors);
  }

  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username }).then(user => {
    // checking for user
    if(!user) {
      return res.status(404).json({ username: 'Username not found'});
    }

    // checking password
    bcrypt.compare(password, user.password).then(isMatch => {

      if(isMatch) {
        // found user, create jwt payload
        const payload = {
          id: user.id,
          name: user.name,
          username: user.username
        };

        // sign token
        // expires in 1 week
        jwt.sign(payload, keys.secretOrKey, { expiresIn: 604800 }, 
          (err, token) => {
            res.status(200).json({ 
              success: true, 
              token: "Bearer " + token
            });
          }
        );

      } else {
        return res.status(404).json({ password: 'Password incorrect.'})
      }
    });
  });
});


module.exports = router;