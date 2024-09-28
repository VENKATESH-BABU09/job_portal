const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
  },
  highestEducation: {
    type: String,
    enum: ["High School", "Diploma", "Degree", "Post-Graduate"],
    default: null,
  },
  degreeType: {
    type: String,
    enum: ["B.E", "B.Tech", "B.Sc", "B.Com"],
    default: null,
  },
  stream: {
    type: String,
    enum: [
      "Computer Science",
      "Electronics",
      "Mechanical Engineering",
      "Civil Engineering",
    ],
    default: null,
  },
  currentStatus: {
    type: String,
    enum: ["Student", "Graduate", "Working Professional"],
    default: null,
  },
  location: {
    type: String,
    default: null,
  },
  skills: {
    type: String,
    default: null,
  },
  experience: {
    type: Number,
    min: 0,
    default: 0,
  },
  resume: {
    type: String, // You might want to store the path to the uploaded resume file
    default: null,
  },
  profilePicture: {
    type: String, // You might want to store the path to the uploaded profile picture file
    default: null,
  },
}, { timestamps: true }); // Automatically create createdAt and updatedAt fields


userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;



// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
  
//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (err) {
//     next(err);
//   }
// });

