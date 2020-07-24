const User = require("../models/user");
const Post = require("../models/post");
const jwt = require("jsonwebtoken");
const objectID = require("mongodb").ObjectID;
const { Response, ResponseError } = require("../utils/response");
require("dotenv").config();

exports.deletePost = async (request) => {
  const token = request.get("Authorization");
  if (!token) throw new ResponseError(400, "Token not provided");
  try {
    const payload = jwt.verify(token, process.env.SECRETKEY);
    let checkPayload = User.findById(payload.id);
    if (!checkPayload) throw new ResponseError(400, "No such User with the Id");
  } catch (error) {
    throw new ResponseError(400, "Invalid JWT");
  }
  const { postUserId } = request.body;
  if(!objectID.isValid(postUserId)) throw new ResponseError(400,'User ID is not valid, please provide valid ID')

  if (!postUserId) throw new ResponseError(400, "Provide User Id");
  //delete post
  let existingPost = await Post.findById(postUserId);
  console.log(existingPost);
  if (!existingPost) throw new ResponseError(400, "Post have been deleted");
  await Post.findByIdAndRemove(postUserId);
  return new Response(200, "Deleted Successfully");
};
