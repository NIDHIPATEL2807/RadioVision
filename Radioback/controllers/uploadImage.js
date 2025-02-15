import fs from "fs";
import axios from "axios";
import FormData from "form-data";
import MedicalImage from "../model/MedicalImage.model.js";

export const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const localFilePath = req.file.path;
        console.log("✅ Local File Path:", localFilePath);

        const flaskAPI = "http://127.0.0.1:5000/predict";

        // Read the file and send it as FormData
        const formData = new FormData();
        formData.append("image", fs.createReadStream(localFilePath));

        console.log("🔹 Sending image file to Flask API...");

        const flaskResponse = await axios.post(flaskAPI, formData, {
            headers: { 
                ...formData.getHeaders() // Important! Adds proper headers for FormData
            },
        });

        console.log("✅ Flask API Response:", flaskResponse.data);

        const processedData = flaskResponse.data;

        const medicalImage = new MedicalImage({
            original_url: localFilePath, // Save local path in MongoDB
            disease: processedData.disease,
            probability: processedData.probability,
        });

        await medicalImage.save();
        console.log("✅ Saved to MongoDB");

        return res.status(201).json({
            message: "Image processed successfully",
            original_url: localFilePath,
            processed_data: processedData,
        });

    } catch (error) {
        console.error("❌ Main Error:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};
