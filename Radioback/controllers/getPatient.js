export const getPatients = async (req,res) =>{
    try{
        const doctor_id = req.user.id;
        const patients = await Patient.find({doctor_id});
        res.status(200).json(patients);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Error fetching patients"});
    }
}