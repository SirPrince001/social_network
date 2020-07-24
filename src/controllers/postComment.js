const Post = require("../models/post");
const User = require("../models/user");
const Comment = require("../models/comment");
const mongoose = require("mongoose");

const { Response, ResponseError } = require("../utils/response");

exports.PostWithComment = async (request) => {
  let { post, likes } = request.body;

  const parent_id = request.params.parent;

  if (!post)
    throw new ResponseError(400, "text not in request body. provide post text");

  let comment;
  //let postLike = []

  if (!mongoose.isValidObjectId(parent_id))
    throw new ResponseError(400, `id ${parent_id} is not a valid object id`);

  const parent = await Post.findById(parent_id);
  if (!parent)
    throw new ResponseError(400, `post with id ${parent_id} does not exist`);
    
    
    

  comment = new Post({
    post: post,
    is_comment: true,
    parent_id: parent_id,
    date_created: Date.now(),
    //likes: Math.round(Math.random() * 20) ,

    // post: post,
    // is_comment: true,
    // parent_id: parent_id,
    // date_created: Date.now(),
    // likes: likes ,
  });

  await comment.save();

  return new Response(200, comment);
};

exports.getPostWithComment = async (request) => {
  const parent = request.params.parent;

  if (!mongoose.isValidObjectId(parent))
    throw new ResponseError(400, `${parent} is not a valid object id`);

  if (!(await Post.findById(parent)))
    throw new ResponseError(400, `${parent} matches no posts`);

  const comments = await Post.find({ parent_id: parent, is_comment: true });

  return new Response(200, { comments: comments });
};
