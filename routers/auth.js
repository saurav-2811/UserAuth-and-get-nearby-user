const express=require('express')
const{getAllUser}=require('../controllers/auth')
//initialise router
const router=express.Router()
router.route('/').get(getAllUser)



module.exports=router
