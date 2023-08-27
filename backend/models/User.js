const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  usr_id: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  pass: { type: String },
});

const User = mongoose.model('User', userSchema);

module.exports = User
