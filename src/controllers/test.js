const jwt = require("jsonwebtoken");
require("dotenv").config();
const { Response, ResponseError } = require("../utils/response");

exports.tokenVerify = (request) => {
  const token = request.body.jwt;
  // console.log(token)
  // console.log(process.env.SECRETKEY)
  let payload = jwt.verify(token, process.env.SECRETKEY);
    console.log(x)
  return new Response(200, payload);
};
