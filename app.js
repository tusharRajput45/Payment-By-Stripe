const app=require('express')();
const bodyparser=require('body-parser')

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
const env=require('dotenv')

env.config({path:__dirname+'/config/.env'})


require('./config/database')

const userRoute=require('./route/userRoute')

app.use('/',userRoute)
 app.get('/post',(req,res)=>{
    console.log("working");
    res.send('working')
 })


const URL=process.env.PORT;
app.listen(URL,()=>{
    console.log(`Server is runnig port no ${URL}`);
})