import dotenv from 'dotenv';
dotenv.config()
import express from 'express';
import { urlencoded } from 'express';
import { connectDB } from './database.js';
import cors from 'cors';




const app = express();
const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})

connectDB().then(()=>console.log("Connected to DB")).catch((err)=>console.log(err))

app.use(cors())
app.use(urlencoded())
app.use(express.json())


// making api here only cause why should i work huh 
// love you hitesh

app.post('/api/signup',async(req,res)=>{
    // console.log(req.body);
    try{
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({message:"All fields are required"});
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }

        const user = new User({name, email, password});
        await user.save();
        res.status(201).json({message:"User created successfully"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Login failed"});
    }


})



