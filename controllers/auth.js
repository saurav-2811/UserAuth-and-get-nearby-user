const mongoose=require('mongoose')

 exports.getAllUser=async(req,res,next)=>{
    res.status(200).json({
        success:true
    })
 }