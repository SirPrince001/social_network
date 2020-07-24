const Post = require("../models/post");
const Comment = require('../models/comment')
const { Response, ResponseError } = require("../utils/response");

exports.getAllpost = async (request) => {
  try {
    let seenPost = await Post.find().limit(10);
    //using regular expression to get a post made by a username
    //let seenPost = await Post.find({name:{$regex:"buchi"}})
    return new Response(200, seenPost);
  } catch (error) {
    throw new ResponseError(400, "Error fetching post");
  }
};

exports.getPostById = async (request) => {
  try {
    let getSinglePost = await Post.findOne({_id:request.params.id});
    return new Response(200, getSinglePost);
  } catch (error) {
    throw new ResponseError(400, "Cannot get Users post with this Id");
  }
};

