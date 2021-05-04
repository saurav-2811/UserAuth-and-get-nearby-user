const express=require('express')
const{getAllUser,register,GetWithInRadius,getspecificuser,updateuser,deleteuser}=require('../controllers/auth')
//initialise router
const router=express.Router()
router.route('/').get(getAllUser)
router.route('/:id').get(getspecificuser).put(updateuser).delete(deleteuser)
router.route('/register').post(register)
router.route('/radius/:zipcode').get(GetWithInRadius)

module.exports=router
