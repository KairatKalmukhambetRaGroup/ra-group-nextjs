import mongoose from "mongoose";

const applicationSchema = mongoose.Schema({
    firstname: {type: String, requird: true},
    lastname: {type: String, requird: true},
    email: {type: String, requird: true},
    companyName: {type: String, requird: true},
    os: {type: [String], requird: true},
    format: {type: String, requird: true},
    lang: String,
}, {
    timestamps: true
});

const Application = mongoose.models.Application || mongoose.model('Application', applicationSchema);

export default Application;