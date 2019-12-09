const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    createdDate: {
        type: String,
        default: Date.now
    },
    publicDate: {
        type: String,
        default: Date.now
    },
    tags: []
});

module.exports = Post = mongoose.model('Post', PostSchema)