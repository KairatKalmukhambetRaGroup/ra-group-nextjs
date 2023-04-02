import mongoose from "mongoose";

const applicationSchema = mongoose.Schema({
    name: {type: String, requird: true},
    firstname: {type: String, requird: true},
    platform: [String],
    lastname: {type: String, requird: true},
    email: {type: String, requird: true},
    phone: {type: String, requird: true},
    devtype: {type: String, required: true},
    companyName: {type: String, requird: true},
    os: {type: [String], requird: true},
    format: {type: String, requird: true},
    lang: String,
}, {
    timestamps: true
});

const Application = mongoose.models.Application || mongoose.model('Application', applicationSchema);

export default Application;