const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const postSchema = new Schema({
  name:String,
  author:String,
  title:String,
  sender_id: String,
  seen_by: String,
  date_created: Number,
  post: String,
  comments: String,
  likes: [String],
  is_comment: Boolean,
  parent_id:String,
});

module.exports = Mongoose.model("userPost", postSchema);
