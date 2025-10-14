const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['admin', 'member'], default: 'member' },
  createdAt: { type: Date, default: Date.now }
});

const user = mongoose.model('User', UserSchema);
module.exports=user