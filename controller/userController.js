const userModel=require('../model/userModel')
const bcrypt=require('bcrypt')
const jwt_token=require('jsonwebtoken')
const token_secret_key='myjsonwebtokensecretkey'

const create_token=async(id)=>{
    try {
       const token =await jwt_token.sign({_id:id},token_secret_key)
       return token
    } catch (error) {
        res.status(400).send('server error')
    }
}


const SecurePassword=async(Password)=>{
    try {
        const passwordHash=await bcrypt.hash(Password,10);
        return passwordHash;
    } catch (error) {console.log(error.message);}
    }
const user_create=async(req,res)=>{
    console.log(req.body);
     try {
        const checkEmail=await userModel.findOne({email:req.body.email})
        const checkMobile=await userModel.findOne({mobile:req.body.mobile})
        const password=await SecurePassword(req.body.password)
        if (checkEmail && checkMobile) {
            console.log('email and mobile is not exist');
        } else {
            const User=new userModel({
                   name:req.body.name,
                   email:req.body.email,
                   mobile:req.body.mobile,
                   password:password,
            })
            const saveUser=await User.save()
            if (saveUser) {
                res.status(200).send({msg:'successfully register',suceess:true})
                console.log(saveUser);
            }
        }
     } catch (error) {res.status(200).send({msg:'server error'})}
}
const user_login=async(req,res)=>{
    try {
        if (req.body) {
            const userData=await userModel.findOne({email:req.body.email})
            if(userData){
              const matchPassword=await bcrypt.compare(req.body.password,userData.password)
              if (matchPassword) {
                const  tokenData= await create_token(userData._id)
                 const userResult={
                    _id:userData._id,
                    name:userData.name,
                    email:userData.email,
                    mobile:userData.mobile,
                    password:userData.password,
                    token:tokenData
                 }
                 const response={
                    success:true,
                    msg:'user details',
                    data:userResult
                 }
                 res.status(200).send(response)
              } else {res.status(200).send({msg:'password is not matched',success:false})}
            }else{res.status(200).send({msg:'email is not exist',success:false})}
        } else {res.status(200).send({msg:'request is not found',success:false})}
    } catch (error) {res.status(200).send({msg:'server error'})}
}
module.exports={
    user_create,
    user_login,
    token_secret_key,
}