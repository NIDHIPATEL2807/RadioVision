export const getPatientsImages = async (req,res) => {
    try {
        const patient_id = req.params.id;
        const images = await MedicalImage.find({ patient_id });
        res.status(200).json(images);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error fetching images" });
    }
}