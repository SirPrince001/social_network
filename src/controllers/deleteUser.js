const User = require("../models/user");
const { Response, ResponseError } = require("../utils/response");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.deleteUserDetails = async (request) => {
  const token = request.get("Authorization");
  if (!token) throw new ResponseError(400, "Token not provided");
  let deleteU;

  try {
    deleteU = jwt.verify(token, process.env.SECRETKEY);
  } catch (error) {
    throw new ResponseError(400, "Invalid Token");
  }
  //const email = request.body.email;
  await User.findByIdAndUpdate(token.id, { $set: { delete: true } });


  return new Response(200, 'User have been deleted sucessfully');
  
};
