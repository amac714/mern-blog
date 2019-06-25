
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now()
  },
  title: String,
  text: String,
  author: {
    id: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    username: String
  }
});

module.exports = mongoose.model('BlogPosts', BlogPostSchema);