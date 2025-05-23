import mongoose from "mongoose";

const scanSchema = mongoose.Schema({
    ip: String,
    country: String,
    city: String,
    browser: String,
    platform: String,
},{
    timestamps: true
});

const Scan = mongoose.models.Scan || mongoose.model('Scan', scanSchema);
export default Scan;