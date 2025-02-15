import MedicalImage from "../model/MedicalImage.model.js";
// import axios from "axios"; // To call Flask API

export const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const { path } = req.file; // Cloudinary URL

        // 🔹 Step 1: Send Image URL to Flask API
        // const flaskAPI = "http://your-flask-api-url.com/process"; // Change to actual Flask API
        // const flaskResponse = await axios.post(flaskAPI, { image_url: path });

        // 🔹 Step 2: Get Processed Data from Flask API
        const processedData = flaskResponse.data; // This depends on Flask response format

        // 🔹 Step 3: Save Data in MongoDB
        const medicalImage = new MedicalImage({
            original_url: path,
            processed_url: processedData.processed_url || "", // If your Flask API returns a processed image
            description: processedData.description || "", // Example field
        });

        await medicalImage.save();

        // 🔹 Step 4: Send Data to Frontend
        res.status(201).json({
            message: "Image processed successfully",
            original_url: path,
            processed_data: processedData, // Send all processed results to frontend
        });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
