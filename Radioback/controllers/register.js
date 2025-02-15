import bcrypt from "bcryptjs";
import User from "../model/User.model.js";

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // 🔹 Generate Salt & Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            name,
            email,
            password: hashedPassword, // Store hashed password
        });

        await user.save();
        res.status(201).json({ message: "User created successfully" });

    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ message: "Registration failed" });
    }
};
