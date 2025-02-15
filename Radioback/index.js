import dotenv from 'dotenv';
dotenv.config()
import express from 'express';
import { urlencoded } from 'express';
import { connectDB } from './database.js';
import cors from 'cors';
import { register } from './controllers/register.js';
import { login } from './controllers/login.js';




const app = express();
const port = process.env.PORT || 3000;


connectDB().then(()=>console.log("Connected to DB")).catch((err)=>console.log(err))

app.use(cors())
app.use(urlencoded())
app.use(express.json())

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})



// making api here only cause why should i work huh 
// love you hitesh

app.post('/api/signup',async(req,res)=>{
    try{
        await register(req,res);
    }
    catch(err){
        console.log(err);
    }
})

app.post('/api/login',async(req,res)=>{
    try{
        await login(req,res);
    }
    catch(err){
        console.log(err);
    }
})



