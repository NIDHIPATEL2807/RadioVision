import mongoose from "mongoose";

const patientDocSchema = new mongoose.Schema({
    doctor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    patient_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
    },
});

const PatientDoc = mongoose.model('PatientDoc', patientDocSchema);

export default PatientDoc