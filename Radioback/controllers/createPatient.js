import Patient from "../model/Patient.model.js";
import PatientDoc from "../model/PatientDoc.model.js";

export const createPatient = async (req, res) => {
    try {
        const { name, email, age, gender, phone } = req.body;

        // 🔹 Ensure the authenticated user (doctor) is creating the patient
        const doctor_id = req.user.id; // Extracted from JWT authentication

        if (!name || !email || !age || !gender || !phone) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // 🔹 Check if the patient already exists
        const existingPatient = await Patient.findOne({ phone });
        if (existingPatient) {
            return res.status(400).json({ message: "Patient already exists" });
        }

        const password = Math.random().toString(36).slice(2);
        console.log(password);

        // 🔹 Generate Salt & Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        // 🔹 Create a new patient
        const newPatient = new Patient({
            name,
            age,
            password : hashedPassword,
            email,
            gender,
            phone,
        });

        await newPatient.save();

        const patientDoc = new PatientDoc({
            doctor_id,
            patient_id: newPatient._id
        });

        await patientDoc.save();

        res.status(201).json({
            message: "Patient created successfully",
            patient: newPatient,
            originalPassword: password
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
