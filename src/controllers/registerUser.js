const User = require("../models/user");
const Bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Response, ResponseError } = require("../utils/response");
require("dotenv").config();

exports.createUser = async (request) => {
  //set user model
  let { name, email, password, username } = request.body;
  // check if user exist
  const existU = User.findOne({ email: request.body.email });
  //hashing the password
  password = Bcrypt.hashSync(request.body.password, 10);
  //create new user
  if (!existU) {
    let newUser = new User({
      name: name,
      email: email,
      password: password,
      username: username,
    });

    let data = await newUser.save();

    data = data.toJSON();
    data.password;
    delete password;

    let payload = {
      name: data.name,
      email: data.email,
      username: data.username,
    };

    data.token = jwt.sign(payload, process.env.SECRETKEY);
    return new Response(200, data);
  } else {
    throw new ResponseError(400, "User not registered");
  }
};

exports.resetPassword = async (request) => {
  let { name, email, password } = request.body;
  if (!name && !email && !password)
    throw new ResponseError(400, "provide user details");
  //find user with the details to be updated
  let userD = await User.findOne({
    name: name,
    email: email,
  });

  if (!userD) {
    throw new ResponseError(
      400,
      "You are not authorized to change this password"
    );
  } else {
    let pas = Bcrypt.hashSync(password, 10);
    await User.findOneAndUpdate({ email: email }, { $set: { password: pas } });
    return new Response(200, pas);
  }
};

exports.searchUser = async(request)=>{
  const token = request.get('Authorization')
  if(!token)throw new ResponseError(400,"Provide Token")
  const {keyword} = request.qeury

  const payload = jwt.sign(token,process.env.SECRETKEY)
  let sUser  = await User.find({id:payload._id})
  if(!sUser)throw new ResponseError(400,'Cannot Find user')

  let users = await User.find({email:new RegExp("^" +keyword.toLowerCase() , "i")})
  return new Response(200,users)
}


exports.editUser = async(request)=>{
  const token = request.get('Authorization')
  if(!token)throw new ResponseError(400,'provide token')

  let payload = jwt.verify(token,process.env.SECRETKEY)
  await User.findByIdAndUpdate(payload.id , {$set:{name:name?name:payload.name}})
  let newU = await User.find(payload.id)

  newU = newU.toJSON()
  delete newU.password

  const newUserPayload = {
    id:newU.id,
    name:newU.name,
    age:newU.age
  }
  let nm = jwt.sign(newUserPayload,process.env.SECRETKEY)
  return new Response(200,{...newU, token:nm})
}