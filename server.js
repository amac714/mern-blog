
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;

// connecting to mongoDB at mLab
mongoose.connect(db, {useNewUrlParser: true})
  .then(() => console.log('MongoDB successfully connected'))
  .catch(err => console.log(err));

// process.env will be for heroku's port
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server up and running on ${port}`));