const token_secret_key=require('../controller/userController')
const jwt_token=require('jsonwebtoken')


const varifyToken=async(req,res,next)=>{
    const token =req.body.token ||req.query.token||req.headers["authorization"];

    if(!token){
        res.status(200).send({success:false,msg:'a token is required for authentication'})
    }
    try{
               const decode=jwt.varify(token,token_secret_key)
               req.user=descode;
    }catch(error){
           res.status(200).send('Invalid token')
    }
    return next()
}
module.exports={
    varifyToken
}