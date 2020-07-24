const User = require("../models/user");
const jwt = require("jsonwebtoken");
require('dotenv').config()
const { Response, ResponseError } = require("../utils/response");

exports.editUsername = async (request) => {
  const token = request.get("Authorization");
  if (!token) throw new ResponseError(400, "Token not provided");

  let nUsername;
  try {
    nUsername = jwt.verify(token, process.env.SECRETKEY);
  } catch (error) {
    throw new ResponseError(400, "Invalid Token");
  }

  const username = request.body.username;
  console.log(username)
  await User.findByIdAndUpdate(nUsername.id, {
    $set: { username: username ? username : nUsername.username },
  });
  let newUpdatedUser = await User.findById(nUsername.id);

  newUpdatedUser = newUpdatedUser.toJSON();
  delete newUpdatedUser.password;

  const payload = {
    id: newUpdatedUser._id,
    name: newUpdatedUser.name,
    email: newUpdatedUser.email,
    username: newUpdatedUser.username,
    age: newUpdatedUser.age,
  };

  let currentUsername = jwt.sign(payload, process.env.SECRETKEY);
  return new Response(200,{...newUpdatedUser, token:currentUsername} );
};
