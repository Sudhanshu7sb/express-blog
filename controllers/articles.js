var Article = require("../models/Article");
var Comment = require("../models/Comment");

exports.listArticles = (req, res, next) => {
  Article.find({}, (err, articles) => {
    res.render("listArticles", { articles });
  });
};

exports.articleCreateForm = (req, res) => {
  res.render("articleForm");
};

exports.details = (req, res, next) => {
  // Article.findById(req.params.id, (err, article) => {
  //   Comment.find({ articleId: req.params.id }, (err, comments) => {
  //     res.render("singleArticle", { article, comments });
  //   });
  // });

  Article.findById(req.params.id)
    .populate("comments")
    .exec((err, article) => {
      res.render("singleArticle", { article });
    });
};

exports.updatePost = (req, res, next) => {
  console.log(req.params.id);

  //   Article.findById(req.params.id, (err, article) => {
  //     console.log("article");
  //     Comment.find({ articleId: req.params.id }, (err, comments) => {
  //       res.render("updatePost", { article });
  //     });
  Article.findById(req.params.id)
    .populate("comments")
    .exec((err, article) => {
      res.render("updatePost", { article });
    });
};

exports.deletePost = (req, res, next) => {
  console.log(req.params.id);

  // Article.findByIdAndDelete(req.params.id, (err, deletedArticle) => {
  //   Comment.find({ articleId: req.params.id }, (err, comments) => {
  //     res.redirect("/articles");
  //   });
  // });
  Article.findByIdAndDelete(req.params.id)
    .populate("comments")
    .exec((err, article) => {
      res.redirect("/articles");
    });
};

exports.postRequestListArticles = (req, res, next) => {
  Article.create(req.body, (err, article) => {
    console.log(err, article);
    if (err) return next(err);
    res.redirect("/articles");
  });
};

exports.postRequestSingleArticle = (req, res, next) => {
  console.log(req.params.id);

  // Article.findByIdAndUpdate(req.params.id, req.body, (err, article) => {
  //   console.log("article post");
  //   Comment.find({ articleId: req.params.id }, (err, comments) => {
  //     // res.render('updates', { article, comments })
  //     res.redirect("/articles");
  //   });
  // });
  Article.findByIdAndUpdate(req.params.id)
    .populate("comments")
    .exec((err, comments) => {
      res.redirect("/articles");
    });
};

exports.postComment = (req, res) => {
  var articleId = req.params.articleId;
  req.body.articleId = articleId;
  // console.log(Comment);

  Comment.create(req.body, (err, comment) => {
    console.log(err, comment);
    Article.findByIdAndUpdate(
      articleId,
      { $push: { comments: comment.id } },
      (err, article) => {
        res.redirect("/articles/" + articleId);
      }
    );
  });

  //   Article.findByIdAndUpdate(articleId, { $push: { comments: comment.id } })
  //     .populate("comments")
  //     .exec((err, comments) => {
  //       res.redirect("/articles/" + articleId);
  //     });
};
