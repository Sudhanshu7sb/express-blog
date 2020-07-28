var express = require('express');
var router = express.Router();
var Article = require("../models/Article");
var Comment = require("../models/Comment");

router.get("/" ,(req,res,next) =>{
    console.log("comment");
    
    res.end("working");
})


router.get("/:id/update",(req,res,next) => {
    Comment.findById(req.params.id,(err,comment) => {
        res.render("commentUpdate",{comment})
    })
})

router.get("/:id/delete",(req,res,next) => {
    Comment.findByIdAndDelete(req.params.id,(err,comment) => {
        console.log(req.params.id,comment);
        res.redirect(`/articles/${comment.articleId}`);
        // res.redirect('/article')
    })
})
router.post("/:id/update",(req,res,next) => {
    Comment.findByIdAndUpdate(req.params.id,req.body,(err,comment) => {
        res.redirect(`/articles/${comment.articleId}`);
    })
})
module.exports = router;