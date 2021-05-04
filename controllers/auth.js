const mongoose=require('mongoose')
const User=require('../models/User')
 exports.getAllUser=async(req,res,next)=>{
    
    res.status(200).json({
        success:true
    })
}
exports.register=async(req,res,next)=>{
    const{name,email,description,dob,password}=req.body
    const user=await User.create({
        name,
        email,
        description,
        dob,
        password
    })
    res.status(200).json({
        success:true,
        data:user
    })
}