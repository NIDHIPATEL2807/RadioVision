import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "medical_images", // Cloudinary folder name
        allowed_formats: ["jpg", "png", "jpeg"], // Allowed formats
    },
});

const upload = multer({ storage });

export default upload;
