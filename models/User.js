const mongoose = require("mongoose");

const Userschema= new mongoose.Schema({
    name:{
        type:String,
        trime:true,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    dob:{
        type: Date,
        required: true,
        default:Date.now,
        trim: true,
    },
    email:{
        type: String,
        required:[true,'Please add a email'],
        unique:true,
        match:[/^\S+@\S+\.\S+/,'Please add an valid email']
    },
    password:{
        type:String,
        required:[true,'Please add a password'],
        minlength:6,
        select:false
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
    createdAt:{
        type: Date,
        default:Date.now
    }
})
module.exports=mongoose.model('User',Userschema)