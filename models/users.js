var mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    username: String, 
    email: String, 
    password: String
    
 });

 let userModel = mongoose.model("users" , userSchema)

 module.exports = userModel;