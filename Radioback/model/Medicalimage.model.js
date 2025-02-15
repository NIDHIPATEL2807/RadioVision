import mongoose from "mongoose";

const MedicalImageSchema = mongoose.Schema({
    original_url:{
        type: String,
        required: true,
    },
    processed_url:{
        type: String,
        // required: true
    },
    patient_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    doctor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    description: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }       
});

const MedicalImage = mongoose.model('MedicalImage', MedicalImageSchema);
export default MedicalImage;