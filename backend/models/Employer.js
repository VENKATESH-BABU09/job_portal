const mongoose = require('mongoose');

const employerSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, lowercase: true},
    password: { type: String}, 
    companyName: { type: String },
    companyDetails: { type: String }, 
    createdAt: { type: Date, default: Date.now }
});

const Employer = mongoose.model('Employer', employerSchema);

module.exports = Employer;
