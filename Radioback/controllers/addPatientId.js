import Patient from "../model/Patient.model";
import PatientDoc from "../model/PatientDoc.model";

export const addPatientId = async (req, res) => {
    try{
        const {email , password} = req.body;

        if(!email || !password){
            return res.status(400).json({message:"All fields are required"});
        }

        const patient = await Patient.findOne({email});
        if(!patient){
            return res.status(400).json({message:"Patient not found"});
        }

        // 🔹 Compare Hashed Password
        const isMatch = await bcrypt.compare(password, patient.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        const patientDoc = new PatientDoc({doctor_id: req.user.id, patient_id: patient._id});
        await patientDoc.save();
        res.status(200).json({message:"Patient id added successfully"});
       
    }
    catch(err){
        console.log(err);
        res.status(200).json({message:"Login failed"});
    }

    
}