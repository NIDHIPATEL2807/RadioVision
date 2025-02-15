import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    dob:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    doctor_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
},{ timestamps: true });
 
const Patient = mongoose.model('Patient', patientSchema);
export default Patient