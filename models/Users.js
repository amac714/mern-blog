
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now()
  },
  blogPosts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'BlogPosts'

    }
  ]
});

module.exports = mongoose.model('Users', UserSchema);