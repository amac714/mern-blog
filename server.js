const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');

const users = require('./routes/api/users');
const blogposts = require('./routes/api/posts');

// process.env will be for heroku's port
const port = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// db config
const db = require('./config/keys').mongoURI;

// need to set useFindAndModify to false because
// we want to use mongodb's version of findOneAndUpdate
// this will take away deprecation warnings
mongoose.set('useFindAndModify', false);

// connecting to mongoDB at mLab
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB successfully connected'))
  .catch(err => console.log(err));

// passport middleware
app.use(passport.initialize());

// passport config
require('./config/passport')(passport);

// routes
app.use('/api/users/', users);
app.use('/api/blogposts/', blogposts);

app.listen(port, () => console.log(`server up and running on ${port}`));
