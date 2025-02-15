import mongoose from "mongoose";

const MedicalImageSchema = mongoose.Schema({
    original_url:{
        type: String,
        required: true,
    },
    processed_url:{
        type: Object,
        // required: true
    },
    patient_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
    
    },
    doctor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',

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
export default MedicalImage