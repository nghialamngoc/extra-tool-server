const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
        min: 6,
        max: 100
    },
    content: {
        type: String,
        required: true,
        min: 1,
        max: 500
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