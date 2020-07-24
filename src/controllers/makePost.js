const Post = require("../models/post");
const User = require("../models/user");
const { Response, ResponseError } = require("../utils/response");
require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.sendPost = async (request) => {
    const token = request.get("Authorization");
    if (!token) throw new ResponseError(400, "Please provide Token");

    try {

    const payload = jwt.verify(token, process.env.SECRETKEY);
    let userId = await User.findById(payload.id);
    if (!userId) throw new ResponseError(400, "No User matches with this ID");
    let { name, author, title, post, sender_id, } = request.body;
    let message = new Post({
      name: name,
      author:author,
      title:title,
      post: post,
      sender_id: sender_id
    });
    let sendMessage = await message.save();
    console.log(sendMessage);
    return new Response(200, sendMessage);
  } catch (error) {
    throw new ResponseError(400, "You cannot make a post,Please provide token");
  }
};
