const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min:6
  },
  date: {
    type: Date,
    default: Date.now
  },
  rol: {
    type: String,
    default: 'User'
  },
  avatar: {
    type: String,
    default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUhppkWlawG5RJ-3KRt14HLEwTvkFVaG1R7mtPoRHdCddcxoeT&s'
  }
})

module.exports = mongoose.model('User', userSchema)