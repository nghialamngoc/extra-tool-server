const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// @desc Get posts.
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

router.get('/test', (req, res) => res.json({ msg: 'Posts Works' }));

module.exports = router;