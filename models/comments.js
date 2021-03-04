const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentsSchema = new mongoose.Schema({
  text: {
    type: String,
  },
  created_date: {
    type: Date,
    default: Date.now
  },
  createdBY: {
    type: Date,
    default: Date.now
  }

});

const Comments = mongoose.model('Comments', commentsSchema);

module.exports = Comments;
