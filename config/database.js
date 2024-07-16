const mongoose=require('mongoose')

mongoose.connect(process.env.mongo_URL).then(()=>{
    console.log('database connect');
}).catch(()=>{
    console.log('database not connect');
})

module.exports=mongoose