import jwt from "jsonwebtoken"
import User from "../model/User.model.js"
import bcrypt from "bcryptjs"


export const login = async (req,res)=>{
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({message:"All fields are required"});
        }
        
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"User not found"});
        }

        // 🔹 Compare Hashed Password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"});
        res.status(200).json({message:"Login successful",token,name:user.name});

    }
    catch(err){
        console.log(err);
        res.status(200).json({message:"Login failed"});
    }
}