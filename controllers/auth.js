const mongoose=require('mongoose')
const asyncHandler= require('../middlewares/async')
const ErrorResponse= require('../utilities/errorResponse')
const geocoder= require('../utilities/geocoder')
const User=require('../models/User')
const {NODE_ENV,COOKIE_EXPIRE}=require('../config/index')

//@desc         create user
//@route        post on /auth/register
//access        public

exports.register=asyncHandler(async(req,res,next)=>{
    const{name,email,description,dob}=req.body
    const user=await User.create(req.body)
    res.status(200).json({
        success:true,
        data:{name,email,description,dob}
    })
      
    })

//@desc         login user
//@route        post on /auth/login
//access        public
exports.login =asyncHandler(async(req,res,next) =>{
    //taking out name,email,password,role from req.body
    const {email,password}=req.body

    //validation
    if(!email||!password){
        return next(new ErrorResponse('Please provide credentials',400))
    }
    const user=await User.findOne({email}).select('+password')
    if(!user){
        return next(new ErrorResponse('invalid credentials',401))
    }
    const ismatch=await user.matchpassword(password)
    if(!ismatch){
        return next(new ErrorResponse('invalid credentials',401))
    }
    sendTokenResponse(user,200,res)
})



//@desc         logout user
//@route        post on /auth/logout
//access        public
exports.logout =asyncHandler(async(req,res,next) =>{
    res.cookie('token','none',{
        expires:new Date(Date.now()+10*1000),
        httpOnly:true
    })
   
    res.status(200).json({
        success:true,
        data:{}
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
//@route        get on /auth/radius/:email/:name
//access        private
exports.GetWithInRadius = asyncHandler(async(req,res,next) =>{
    const abc=await User.findOne({name:req.params.name,email:req.params.email}, function(err,obj) {  })

    if(!abc){
        return next(new ErrorResponse(`name does not exist in any user ${req.params.name}`,404))
    }
    const zipcode= abc.location.Zipcode
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


//get token from model,create cookie and send response
const sendTokenResponse=(user,statusCode,res)=>{
    //create token
    const token=user.getJwtToken()
    const options={
        expires:new Date(Date.now()+COOKIE_EXPIRE*24*60*60*1000),
        httpOnly:true
    };
   
    if(NODE_ENV==='production'){
        options.secure=true
    }
    res
    .status(statusCode)
    .cookie('token',token,options)
    .json({
        success:true,
        token:token
    })
}