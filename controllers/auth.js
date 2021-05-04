const mongoose=require('mongoose')
const asyncHandler= require('../middlewares/async')
const ErrorResponse= require('../utilities/errorResponse')
const geocoder= require('../utilities/geocoder')
const User=require('../models/User')


//@desc         create user
//@route        post on /auth/register
//access        public

exports.register=asyncHandler(async(req,res,next)=>{
    
      const user=await User.create(req.body)
      
      res.status(200).json({
          success:true,
          data:user
      })
    })

//@desc         get all users
//@route        get on /auth/
//access        private

exports.getAllUser=asyncHandler(async(req,res,next)=>{
    const user=await User.find()
    res.status(200).json({
        success:true,
        count:user.length,
        data:user
    })
})

//@desc         get a specific user
//@route        get on /auth/:id
//access        private
exports.getspecificuser=asyncHandler(async(req,res,next)=>{
    const user=await User.findById(req.params.id)
    res.status(200).json({
        success:true,
        data:user
    })
})


//@desc         update specific user
//@route        put on /auth/:id
//access        private
exports.updateuser=asyncHandler(async(req,res,next)=>{
    let user=await User.findById(req.params.id)
    if(!user){
        return next(new ErrorResponse(`User not found in database id:${req.params.id}`,404))
    }

    user=await User.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    })
    res.status(200).json({
        success:true,
        data:user
    })
})


//@desc         delete a specific user
//@route        delete on /auth/:id
//access        private
exports.deleteuser=asyncHandler(async(req,res,next)=>{
    const user=await User.findById(req.params.id)
    if(!user){
        return next(new ErrorResponse(`User not found in database id:${req.params.id}`,404))
    }
    await user.remove()
    res.status(200).json({
        success:true,
        data:{}
    })
})

//@desc         get users near by  by useing zipcode of that specific  user with range of 10 miles or 15-16km radius 
//@route        get on /auth/radius/:zipcode
//access        private
exports.GetWithInRadius = asyncHandler(async(req,res,next) =>{
    const {zipcode}=req.params;
    const distance=10
   //get latitude and logintude from geocoder
   const loc =await geocoder.geocode(zipcode);
   const lat=loc[0].latitude;
   const lng=loc[0].longitude;
   //calc GetWithInRadius
   const radius = distance / 3963;

   const user = await User.find({
     location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
   });
 
   res.status(200).json({
     success: true,
     count: user.length,
     data: user
   });
});
