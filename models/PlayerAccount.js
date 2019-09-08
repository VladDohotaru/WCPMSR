const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  dateOfBirth: { type: Date, required: true },
  dateOfRegistration: { type: Date, required: true },
});


module.exports = mongoose.model('Account', AccountSchema);