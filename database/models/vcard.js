import mongoose from "mongoose";

const vcardSchema = mongoose.Schema({
    link: {type: String, required: true, unique: true},
    firstname: {type: String, required: true},
    lastname: {type: String},
    email: {type: String},
    website: {type: String},
    mobile: {type: String},
    fax: {type: String},
    organization: {type: String},
    workplace: {type: String},
    country: {type: String},
    city: {type: String},
    scans: [{type: mongoose.Schema.Types.ObjectId, ref: 'Scan'}]
},{
    timestamps: true
});

const VCard = mongoose.models.VCard || mongoose.model('VCard', vcardSchema);
export default VCard;