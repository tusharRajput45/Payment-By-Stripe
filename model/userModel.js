const mongoose=require('mongoose')

const Schema=new mongoose.Schema({
    name:{type:String},
    email:{type:String,lowercase:true,unique:true,},
    mobile:{type:Number,unique:true,},
    password:{type:String},
})
 const userModel=mongoose.model('user',Schema)
 module.exports=userModel