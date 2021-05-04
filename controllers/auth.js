const mongoose=require('mongoose')
const geocoder= require('../utilities/geocoder')
const User=require('../models/User')


//@desc         create user
//@route        post on /auth/register
//access        public

exports.register=async(req,res,next)=>{
  try {
      
      const user=await User.create(req.body)
      res.status(200).json({
          success:true,
          data:user
      })
  } catch (err) {
      console.info(err)
  }
}
 

//@desc         get all users
//@route        get on /auth/
//access        private

exports.getAllUser=async(req,res,next)=>{
    const user=await User.find()
    res.status(200).json({
        success:true,
        count:user.length,
        data:user
    })
}

//@desc         get a specific user
//@route        get on /auth/:id
//access        private
exports.getspecificuser=async(req,res,next)=>{
    const user=await User.findById(req.params.id)
    res.status(200).json({
        success:true,
        data:user
    })
}


//@desc         update specific user
//@route        put on /auth/:id
//access        private
exports.updateuser=async(req,res,next)=>{
    const user=await User.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    })

    res.status(200).json({
        success:true,
        data:user
    })
}


//@desc         delete a specific user
//@route        delete on /auth/:id
//access        private
exports.deleteuser=async(req,res,next)=>{
    const user=await User.findByIdAndDelete(req.params.id)

    res.status(200).json({
        success:true,
        data:user
    })
}

//@desc         get users near by  by useing zipcode of that specific  user with range of 10 miles or 15-16km radius 
//@route        get on /auth/radius/:zipcode
//access        private
exports.GetWithInRadius = async(req,res,next) =>{
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
};
