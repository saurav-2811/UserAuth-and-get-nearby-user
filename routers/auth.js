const express=require('express')
const{getAllUser,register}=require('../controllers/auth')
//initialise router
const router=express.Router()
router.route('/').get(getAllUser)
router.route('/register').post(register)


module.exports=router
