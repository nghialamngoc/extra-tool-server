const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// @desc Create post.
// @acces Public.
router.post('/', (req, res) => {
    const newPost = new Post({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        createdDate: req.body.createdDate,
        publicDate: req.body.publicDate,
        tags: req.body.tags
    });
    newPost.save().then(post => res.json(post));
});

// @desc Get posts
router.get('/', (req, res) => {
    Post.find()
        .sort({date: -1})
        .then(post => res.json(post))
        .catch(err => res.status(404).json('No post found!'))
});

module.exports = router;