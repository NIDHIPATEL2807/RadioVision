import Patient from "../model/Patient.model.js";

export const createPatient = async (req, res) => {
    try {
        const { name, age, gender, phone } = req.body;

        // 🔹 Ensure the authenticated user (doctor) is creating the patient
        const doctor_id = req.user.id; // Extracted from JWT authentication

        if (!name || !age || !gender || !phone) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // 🔹 Check if the patient already exists
        const existingPatient = await Patient.findOne({ phone });
        if (existingPatient) {
            return res.status(400).json({ message: "Patient already exists" });
        }

        const password = Math.random().toString(36).slice(2);
        console.log(password);


        // 🔹 Create a new patient
        const newPatient = new Patient({
            name,
            age,
            password,
            gender,
            phone,
            doctor_id
        });

        await newPatient.save();

        res.status(201).json({
            message: "Patient created successfully",
            // patient: newPatient,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
