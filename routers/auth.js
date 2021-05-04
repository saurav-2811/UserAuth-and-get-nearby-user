const express=require('express')
const {protect}= require('../middlewares/auth')
const{getAllUser,register,GetWithInRadius,getspecificuser,updateuser,deleteuser,login}=require('../controllers/auth')
//initialise router
const router=express.Router()
router.route('/').get(protect,getAllUser)
router.route('/:id').get(protect,getspecificuser).put(protect,updateuser).delete(protect,deleteuser)
router.route('/register').post(register)
router.route('/login').post(login)
router.route('/radius/:zipcode').get(protect,GetWithInRadius)

module.exports=router
