const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

UserSchema.pre('save', async next => {
  try {
    // Check if document is new or a new password has been set
    if (this.isNew || this.isModified('password')) {
      // Saving reference to this because of changing scopes
      const document = this;
      const hashedPassword = await bcrypt.hash(document.password, saltRounds);
      document.password = hashedPassword;
      next();
    } else {
      next();
    }
  } catch (error) {
    next(error)
  }

});


UserSchema.methods.isCorrectPassword = async function(password){
  try {
    console.log(this.password)
    const same = await bcrypt.compare(password, this.password)
    return Promise.resolve(same);
  } catch (e) {
    return Promise.reject(e);
  }

}

module.exports = mongoose.model('User', UserSchema);