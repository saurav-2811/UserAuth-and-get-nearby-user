const mongoose = require("mongoose");
const bcrypt=require('bcryptjs')
const{JWT_SECRET,JWT_EXPIRE}=require('../config/index')
const jwt= require('jsonwebtoken')
const geocoder= require ('../utilities/geocoder')
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
    address:{
        type:String,
        required:true,
        maxlength: [200,'address length must not more than 200']
      },
      location: {
          type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
          //   required: true
          },
          coordinates: {
              type: [Number],
              // required: true,
              index: '2dsphere'
            },
            formattedAddress: String,
            street: String,
            city : String,
            state: String,
            Zipcode : String,
            country : String
      },
    dob:{
        type: Date,
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
Userschema.pre('save',async function(next){
    const loc= await geocoder.geocode(this.address)
    this.location={
      type:'Point',
      coordinates: [loc[0].longitude,loc[0].latitude],
      formattedAddress:loc[0].formattedAddress,
      street:loc[0].streetName,
      city:loc[0].city,
      state:loc[0].stateCode,
      Zipcode:loc[0].zipcode,
      country:loc[0].countryCode
    }
    //dont save address after getting formatted in db
    this.address=undefined
    next()
  });
  Userschema.pre('save',async function(next){
    const salt=await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,salt)
    next()
  })

  Userschema.methods.getJwtToken=function(){ return jwt.sign({
    id:this._id
   },JWT_SECRET, { expiresIn:JWT_EXPIRE})
 }
 Userschema.methods.matchpassword=async function(enteredpassword){
  return await bcrypt.compare(enteredpassword,this.password)
}

module.exports=mongoose.model('User',Userschema)
