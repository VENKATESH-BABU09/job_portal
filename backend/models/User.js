const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
  username: { // Change from name to username
    type: String,
    required: true,
    unique: true,  // Username must be unique
  },
  email: {
    type: String,
    lowercase: true, 
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String
  },
  profile: {
    bio: {
      type: String,
    },
    skills: {
      type: [String],
    },
    resume: {
      type: String,
    },
  },
}, {
  timestamps: true,
});


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

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
