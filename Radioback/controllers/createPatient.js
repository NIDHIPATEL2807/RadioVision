import Patient from "../models/Patient.model.js";

export const createPatient = async (req, res) => {
    try {
        const { name, email, password, dob, gender, phone } = req.body;

        // 🔹 Ensure the authenticated user (doctor) is creating the patient
        const doctor_id = req.user.id; // Extracted from JWT authentication

        if (!name || !email || !password || !dob || !gender || !phone) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // 🔹 Check if the patient already exists
        const existingPatient = await Patient.findOne({ email });
        if (existingPatient) {
            return res.status(400).json({ message: "Patient already exists" });
        }

        // 🔹 Create a new patient
        const newPatient = new Patient({
            name,
            email,
            password,
            dob,
            gender,
            phone,
            doctor_id
        });

        await newPatient.save();

        res.status(201).json({
            message: "Patient created successfully",
            patient: newPatient,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
