
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now()
  },
  text: String,
  author: {
    id: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    username: String
  }
});

module.exports = mongoose.model('Posts', PostSchema);