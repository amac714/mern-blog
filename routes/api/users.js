
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

// new user registration route
router.post('/register', (req, res) => {

  // Form validation
  const { errors, isValid } = validateResgisterInput(req.body);

  if(!isValid) {
    return res.status(400).json(errors);
  }

  // check if username already exists in db
  User.findOne({ username: req.body.email }).then(user => {
    if(user) {
      return res.status(400).json({ username: 'Email already exists' });
    } else {
      const newUser = new User ({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password
      });
    }
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
});

module.exports = router;