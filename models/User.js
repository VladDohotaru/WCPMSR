const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});


UserSchema.pre('save', function(next) {
  // Check if document is new or a new password has been set
  if (this.isNew || this.isModified('password')) {
    // Saving reference to this because of changing scopes
    const document = this;
    bcrypt.hash(document.password, saltRounds,
      function(err, hashedPassword) {
      if (err) {
        next(err);
      }
      else {
        document.password = hashedPassword;
        next();
      }
    });
  } else {
    next();
  }
});


UserSchema.methods.isCorrectPassword = async function(password){
  try {
    console.log("PArola Criptata?", this.password)
    console.log("PArola din request?", password)
    const same = await bcrypt.compare(password, this.password)
    return Promise.resolve(same);
  } catch (e) {
    return Promise.reject(e);
  }

}

module.exports = mongoose.model('User', UserSchema);