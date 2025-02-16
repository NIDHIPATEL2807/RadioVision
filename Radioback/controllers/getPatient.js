import PatientDoc from "../model/PatientDoc.model.js";

export const getPatients = async (req,res) =>{
    try{
        const doctor_id = req.user.id;
        const patients = await PatientDoc.find({doctor_id}).populate('patient_id');
        res.status(200).json(patients);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Error fetching patients"});
    }
}