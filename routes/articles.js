var express = require("express");
var router = express.Router();
var Article = require("../models/Article");
var Comment = require("../models/Comment");
var articleController = require("../controllers/articles");

/* GET users listing. */
router.get("/", articleController.listArticles);

router.get("/new", articleController.articleCreateForm);

router.get("/:id", articleController.details);

router.get("/:id/update", articleController.updatePost);

router.get("/:id/delete", articleController.deletePost);

router.post("/", articleController.postRequestListArticles);

router.post("/:id", articleController.postRequestSingleArticle);

router.post("/:articleId/comments", articleController.postComment);

module.exports = router;
