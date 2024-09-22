const mongoose = require('mongoose');

const employerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, 
    companyName: { type: String, required: true },
    companyDetails: { type: String }, 
    createdAt: { type: Date, default: Date.now }
});

const Employer = mongoose.model('Employer', employerSchema);

module.exports = Employer;
