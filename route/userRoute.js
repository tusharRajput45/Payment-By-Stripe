const userRoute=require('express')();
const userController=require('../controller/userController')
const userPaymentController=require('../controller/userPaymentController')

const ejs=require('ejs')

userRoute.set('view engine','ejs')
userRoute.set('views','./views/user')

const auth=require('../middleware/auth')
  
userRoute.post('/user-register',userController.user_create)
userRoute.post('/user-login',userController.user_login)
userRoute.get('/test',auth.varifyToken,function(req,res){console.log('Authenticated');})
userRoute.get('/buy',userPaymentController.buyPage)
userRoute.post('/user-payment',userPaymentController.userPayment)
userRoute.get('/user-payment-success',(req,res)=>{res.render('success')})
userRoute.get('/user-payment-failure',(req,res)=>{res.render('failure')})




module.exports=userRoute