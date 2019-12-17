const mongoose = require('mongoose');
const articleSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
  tags: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true,
  },
  isReviewed: {
    type: Boolean,
    default: false
  },
  createDate: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('Article', articleSchema)