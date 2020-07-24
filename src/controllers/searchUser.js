const User = require("../models/user");
const { Response, ResponseError } = require("../utils/response");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.searchUser = async (request) => {
  const token = request.get("Authorization");
  if (!token) throw new ResponseError(400, "Token not provided");
  const { keyword } = request.query;
  const payload = jwt.verify(token, process.env.SECRETKEY);
  console.log(payload);

  let getSearchedUser = await User.find({ _id: payload.id });

  console.log(getSearchedUser)
  if (!getSearchedUser) throw new ResponseError(400, "Cannot not find User");
  const users = await User.find({ username: new RegExp("^" + keyword.toLowerCase(), "i") });
  return new Response(200, {users: users});
};
