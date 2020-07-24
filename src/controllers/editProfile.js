const jwt = require("jsonwebtoken");
const User = require("../models/user");
require('dotenv').config()
const { Response, ResponseError } = require("../utils/response");


exports.editUserProfile = async (request) => {
    const token = request.get("Authorization");
    console.log(token)
  if (!token) throw new ResponseError(400, "Token not Provided");
  let x;


  try {
 x = jwt.verify(token, process.env.SECRETKEY);
    console.log(x)
  } catch (error) {
    throw new ResponseError(400, "Invalid token");
  }
  const{age,name} = request.body
  await User.findByIdAndUpdate(x.id, {$set:{age:age?age:x.age , name:name?name:x.age}})
  let editUser = await User.findById(x.id)
  editUser = editUser.toJSON()
  delete editUser.password

  const payload ={
      id: editUser._id,
      name:editUser.name,
      email:editUser.email,
      username:editUser.username,
      aga:editUser.age
  }
  
  let newUserToken = jwt.sign(payload,process.env.SECRETKEY)
  return new Response(200, {...editUser,token:newUserToken})



};
