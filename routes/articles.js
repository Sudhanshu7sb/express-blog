var express = require('express');
var router = express.Router();
var Article = require("../models/Article");
var Comment = require("../models/Comment");

/* GET users listing. */
router.get('/', function(req, res, next) {
 Article.find({} , (err,articles) => {
  
   res.render('listArticles' , { articles });
 })
});


router.get('/new', (req, res) => {
  res.render('articleForm');
});

router.get('/:id', (req, res, next) => {
  Article.findById(req.params.id, (err, article) => {
    Comment.find({articleId: req.params.id}, (err, comments) => {
      res.render('singleArticle', { article, comments })
    })
    
  })
}) 


router.get('/:id/update', (req, res, next) => {
  console.log(req.params.id);
  
  Article.findById(req.params.id, (err, article) => {
    console.log("article");
    Comment.find({articleId: req.params.id}, (err, comments) => {
      
      res.render('updatePost', { article, comments })
    })
    
    //  res.render('updatePost', {article});
  })
}) 




router.get('/:id/delete', (req, res, next) => {
  console.log(req.params.id);
  
  Article.findByIdAndDelete(req.params.id, (err, deletedArticle) => {
    Comment.find({articleId: req.params.id}, (err, comments) => {
      
      res.redirect('/articles')
    })
    
  })

});



router.post('/', (req, res, next) => {
  Article.create(req.body, (err, article) => {
    console.log(err, article);
    if(err) return next(err);
    res.redirect('/articles');
  })
});


router.post('/:id', (req, res, next) => {
  console.log(req.params.id);
  
  Article.findByIdAndUpdate(req.params.id, req.body ,(err, article) => {
    console.log("article post");
    Comment.find({articleId: req.params.id}, (err, comments) => {
      
      // res.render('updates', { article, comments })
      res.redirect('/articles')
    })
    
     
  })
}) 



router.post('/:articleId/comments', (req, res) => {
  var articleId = req.params.articleId;
  req.body.articleId = articleId;
  // console.log(Comment);
  
  Comment.create(req.body, (err, comment) => {
    console.log(err,comment);
    res.redirect('/articles/' + articleId)
  })
    
    // res.redirect('/articles/' + articleId);
});

module.exports = router;
