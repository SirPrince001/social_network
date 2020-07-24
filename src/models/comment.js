const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const userComments = new Schema({
    username :String,
    commentContent:String
})

module.exports = Mongoose.model('Comments' , userComments)