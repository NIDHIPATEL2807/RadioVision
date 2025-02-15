import dotenv from 'dotenv';
dotenv.config()
import express from 'express';
import { urlencoded } from 'express';
import { connectDB } from './config/database.js';
import cors from 'cors';
import upload from './middleware/multer.js';
import { register } from './controllers/register.js';
import { login } from './controllers/login.js';
import { auth } from './middleware/auth.js';
import { uploadImage } from './controllers/uploadImage.js';
import { getPatients } from './controllers/getPatient.js';
import { createPatient } from './controllers/createpatient.js';
import { getPatientsImages } from './controllers/getPatientsImages.js';
import { addPatientId } from './controllers/addPatientId.js';


const app = express();
const port = process.env.PORT || 1000;


connectDB().then(()=>console.log("Connected to DB")).catch((err)=>console.log(err))

app.use(cors())
app.use(urlencoded())
app.use(express.json())

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})



// making api here only cause why should i work huh 
// love you hitesh

app.post('/api/signup',register)

app.post('/api/login',login)

app.post('/api/upload',upload.single("image"),uploadImage);

app.post("/api/patients/create", auth, createPatient);

app.get("/api/patients", auth, getPatients);

app.get("/api/patients/:id", auth, getPatientsImages);

app.post("/api/patients", auth, addPatientId);

app.post("/api/debug-upload", async (req, res) => {
    console.log("🔍 Request file:", JSON.stringify(req.file, null, 2));

    const file = req.file;

    if (!file) return res.status(400).json({ message: "No file uploaded" });

    console.log("🔍 Manually Uploading File:", file);

    try {
        const result = await cloudinary.uploader.upload(file.path, {
            folder: "medical_images",
        });

        console.log("✅ Cloudinary Upload Success:", JSON.stringify(result, null, 2));
        return res.status(200).json({ cloudinary_url: result.secure_url });

    } catch (error) {
        console.error("❌ Cloudinary Upload Failed:", error);
        return res.status(500).json({ message: "Cloudinary upload failed", error });
    }
});



