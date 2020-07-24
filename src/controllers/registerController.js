const User = require("../models/user");
const Becrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Response, ResponseError } = require("../utils/response");
require("dotenv").config();

exports.registerUser = async (request) => {
  //check if user exist
  let existingUser = await User.findOne({ email: request.body.email });
  console.log(existingUser);
  let { name, email, password, username ,age } = request.body;
  //hash the password
  password = Becrypt.hashSync(request.body.password, 10);

  if (!existingUser) {
    let newUser = new User({
      name: name,
      email: email,
      password: password,
      username: username,
      age:age
    });

    let data = await newUser.save();

    data = data.toJSON();
    delete data.password;
    console.log(data._id)
    //create a jwt payload
    const payload = {
      id:data._id,
      name: data.name,
      email: data.email,
      username: data.username,
      age:data.age
    };

    data.token = jwt.sign(payload, process.env.SECRETKEY);

    console.log(data.token);

    return new Response(200, data);
  } else {
    throw new ResponseError(400, "User already exists");
  }
};

exports.getRegisteruser = async (request) => {
  try {
    let displayResult = await User.find();
    console.log(displayResult);
    return new Response(200, displayResult);
  } catch (error) {
    throw error;
  }
};

exports.loginUser = async (request) => {
  // check if the user have been login
  var userLogin = await User.findOne({ email: request.body.email , deleted:false});
  if (!userLogin) {
    throw new ResponseError(400, "User not found");
  }

  if (!Becrypt.compareSync(request.body.password, userLogin.password)) {
    throw new ResponseError(400, "Password enter do not match");
  }
  return new Response(200, userLogin);
};
