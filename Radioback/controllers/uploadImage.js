import MedicalImage from "../model/MedicalImage.model.js";
import axios from "axios";
import FormData from "form-data";
import fs from "fs";

export const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const { path } = req.file; // Cloudinary URL (assuming multer or Cloudinary storage)

        // 🔹 Step 1: Read Image File
        const imageBuffer = fs.readFileSync(req.file.path);

        // 🔹 Step 2: Send Image File to Flask API
        const flaskAPI = "http://127.0.0.1:5000/predict"; // Change to actual Flask API
        const formData = new FormData();
        formData.append("image", imageBuffer, {
            filename: req.file.originalname, // Maintain original filename
            contentType: req.file.mimetype
        });

        const flaskResponse = await axios.post(flaskAPI, formData, {
            headers: { ...formData.getHeaders() }
        });

        // 🔹 Step 3: Get Processed Data from Flask API
        const processedData = flaskResponse.data;

        // 🔹 Step 4: Save Data in MongoDB
        const medicalImage = new MedicalImage({
            original_url: path, // Cloudinary URL
            disease: processedData.disease,
            probability: processedData.probability
        });

        await medicalImage.save();

        // 🔹 Step 5: Send Data to Frontend
        res.status(201).json({
            message: "Image processed successfully",
            original_url: path,
            processed_data: processedData // Forward results from Flask API
        });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
