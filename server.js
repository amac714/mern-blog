const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const blogposts = require('./routes/api/posts');

// process.env will be for heroku's port
const port = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// db config
const db = require('./config/keys').mongoURI;

// connecting to mongoDB at mLab
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB successfully connected'))
  .catch(err => console.log(err));

// passport middleware
app.use(passport.initialize());

// passport config
require('./config/passport')(passport);

app.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ id: req.user.id, username: req.user.username, posts: req.user.blogPosts });
});

// routes
app.use('/api/users/', users);
app.use('/api/blogposts/', blogposts);

app.listen(port, () => console.log(`server up and running on ${port}`));
