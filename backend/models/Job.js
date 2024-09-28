const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  location: { type: String, required: true, trim: true },
  salary: { type: Number, required: true, min: 0 }, // Ensure salary is non-negative
  type: { type: String, required: true, enum: ['Full-time', 'Part-time', 'Contract', 'Internship'] }, // Limit job types
  employer: { type: String, required: true, trim: true }, // Store employer's username instead of _id
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'JobSeeker' }],
  approved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }, // Track when the job was last updated
});

// Middleware to update the `updatedAt` field on save
jobSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
