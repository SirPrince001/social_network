const Post = require("../models/post");
const { Response, ResponseError } = require("../utils/response");
const Mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.unlikePost = async (request) => {
  const token = request.get("Authorization");
  if (!token)
    throw new ResponseError(500, `${token} is invalid , provide valid token`);
  let { postId } = request.body;
  if (!Mongoose.isValidObjectId(postId))
    throw new ResponseError(
      500,
      `${postId} is not a valid post ID , provide valid post ID`
    );
  const payload = jwt.verify(token, process.env.SECRETKEY);
  await Post.findById(payload.id);
  console.log(payload.id)
  let unlikeP = await Post.updateOne(
    { _id: postId },
    { $pull: { likes: payload.id} }
  );
  return new Response(200, unlikeP);
};
