var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var commentSchema = new Schema({
    content : { type : String, required : true},
    articleId : { type : ObjectId, required :true , ref: "Article"}
},{ timestamps : true});

module.exports = mongoose.model("Comment", commentSchema);