const router = require('express').Router();
const validateToken = require('../common/verifyToken');
const message = require('../common/message');
const Article = require('../models/Article');
const mongoose = require('mongoose');

// GET ALL ARTICLE LIST
router.get('/', (req, res) => {
  const articleType = req.query.type || '';
  const criteriaSearch = articleType != '' ? { tags: articleType } : {};
  console.log(criteriaSearch)
  Article.find(criteriaSearch).select('-content -isReviewed')
    .populate({
      path: 'author',
      select: 'name avatar'
    })
    .exec(function(err, articleList){
      if(err) 
        return res.status(400).json({
          status: 'error',
          errMsg: err
        })
      res.status(200).json({
        status: 'success',
        data: {
          ...articleList
        }
      })
  });
})

//GET BY ID
router.get('/search', async (req, res) => {
  const articleId = req.query.articleid;
  try {
    const article = await Article.findById(articleId).populate({ path: 'author', select: 'name avatar'});
    res.status(200).json({
      status: 'success',
      data: article
    })
  } catch (error) {
    res.status(400).json({
      status: 'error',
      errMsg: error
    })
  }
})

//CREATE NEW ARTICLE
router.post('/', validateToken, async (req, res) => {
  var newArticle = new Article({
    author: new mongoose.Types.ObjectId(req.body.authorId),
    title: req.body.title,
    tags: req.body.tags,
    content: req.body.content,
    isReviewed: req.body.isReviewed,
    createDate: req.body.createDate
  });

  try {
    const savedArticle = await newArticle.save();
    res.status(200).json({
      status: 'success',
      data: savedArticle
    })
  } catch (error) {
    res.status(400).json({
      status: 'error',
      errMsg: error
    })
  }
})

//DELETE ARTICLE
router.delete('/', validateToken, async (req, res) => {
  const articleId = req.query.articleId;
  try {
    await Article.deleteOne({
      _id: new mongoose.Types.ObjectId(articleId)
    })
    res.status(200).json({
      status: 'success'
    })
  } catch (error) {
    res.status(400).json({
      status: 'error',
      errMsg: error
    })
  }
})

//MODIFIER ARTICLE
router.put('/', validateToken, async (req, res) => {
  const articleId = req.body.articleId;  
  try {
    const updatedArticle = await Article.findOneAndUpdate({
      _id: new mongoose.Types.ObjectId(articleId)
    }, {
      author: new mongoose.Types.ObjectId(req.body.authorId),
      title: req.body.title,
      tags: req.body.tags,
      content: req.body.content,
      isReviewed: req.body.isReviewed,
      editDate: req.body.editDate
    },{ new : true });
    res.status(200).json({
      status: 'success',
      data: updatedArticle
    })
  } catch (error) {
    res.status(400).json({
      status: 'error',
      errMsg: error
    })
  }
})

module.exports = router;