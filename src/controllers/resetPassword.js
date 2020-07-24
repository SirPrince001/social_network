const User = require("../models/user");
const Bcrypt = require("bcryptjs");
const { Response, ResponseError } = require("../utils/response");
require("dotenv").config();

exports.resetPassword = async (request) => {
  let { name, email, password } = request.body;
  if (!name && !email && !password)
    throw new ResponseError(400, "You must provide name,email and password");

  //check if the user details are correct
  let userDetails = await User.findOne({
    name: name,
    email: email,
    
  });

  if (!userDetails) {
    throw new ResponseError(
      400,
      "You are not authorized to change this password"
    );
  } else {
    let pass = Bcrypt.hashSync(request.body.password, 10);
    await User.findOneAndUpdate({email:email} , {$set: {password:pass}});
    
    return new Response(200, pass);
  }
};
