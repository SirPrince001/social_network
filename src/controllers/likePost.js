const Post = require("../models/post");
const jwt = require("jsonwebtoken");
const { Response, ResponseError } = require("../utils/response");
const mongoose = require("mongoose");
require("dotenv").config();

exports.likeUserpost = async (request) => {
  //request for token to allow authorization
  const token = request.get("Authorization");
  if (!token) throw new ResponseError(500, "Token not provided");

  const { postId } = request.body;
  console.log(postId)
  //check if postId exist
  if (!mongoose.isValidObjectId(postId))
    throw new ResponseError(500, `${postId} is not a valid post id`);

  const payload = jwt.verify(token, process.env.SECRETKEY);
  await Post.findById(payload.id);
  console.log(payload.id)

  let updateLike = await Post.updateOne(
    { _id: [postId] },
    { $addToSet: { likes: [payload.id] } }
  );

  return new Response(200, updateLike);
};
