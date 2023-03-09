const findOrCreate = require('mongoose-findorcreate');
const passportLocalMongoose = require('passport-local-mongoose');
const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    username:String,
    password:String,
    email:String,
    facebook:String,
    googleId : String
})
//set up find or create plugin
userSchema.plugin(findOrCreate);
//set up passport-local-mongoose plugin
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("member",userSchema)