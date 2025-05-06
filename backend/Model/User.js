const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    fname: {
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }

})


module.exports =mongoose.model("User", UserSchema);