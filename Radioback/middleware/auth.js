import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        
        if(!token){
            return res.status(400).json({message:"Token not found"});
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch(err){
        console.log(err);
        res.status(400).json({message:"Authentication failed"});

    }
}