const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { Response, ResponseError } = require("../utils/response");
require("dotenv").config();

exports.followUser = async (request) => {
  const token = request.get("Authorization");
  if (!token) throw new ResponseError(400, "Invalid token signature");
  const payload = jwt.verify(token, process.env.SECRETKEY);

  const userId = request.body.userId;
  // await User.findById(userId)
  // if(!userId)throw new ResponseError(400,'User with this ID does not exist')
  let defaultUser = await User.findById(payload.id);
 
 
  if (userId === defaultUser) {
   throw new ResponseError(400, "You cannot follow yourself");
 } else {
    let followedUser = await User.updateOne(
      { _id:payload.id},
      { $addToSet: { following: userId } }
    );
    console.log(followedUser);
    return new Response(200, followedUser);
  }
};
