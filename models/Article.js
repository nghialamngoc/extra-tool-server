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
    type: Number,
    default: Date.now()
  },
  articleImg: {
    type: String,
    default: 'https://www.freecodecamp.org/news/content/images/size/w1000/2019/12/codingmyths.jpeg'
  }
})

module.exports = mongoose.model('Article', articleSchema)