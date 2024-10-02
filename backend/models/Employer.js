const mongoose = require('mongoose');

const employerSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, lowercase: true, required: true },
  password: { type: String },
  companyName: { type: String, default: null },
  companyDetails: { type: String, default: null },
  profilePicture: { type: String, default: null },
  createdAt: { type: Date, default: Date.now }
});

const Employer = mongoose.model('Employer', employerSchema);

module.exports = Employer;
