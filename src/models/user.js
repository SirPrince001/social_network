const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  username: String,
  bio: String,
  delete:false,
  following:[String],
  userId:String,
  age:Number
});
const User = Mongoose.model("User", userSchema);
module.exports = User;

