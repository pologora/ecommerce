const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User must have a name'],
    minlength: 2,
  },
  email: {
    type: String,
    required: [true, 'User must have an email'],
    unique: true,
    validate: {
      validator(v) {
        return /\S+@\S+\.\S+/.test(v);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'User must have a password'],
    minlength: 4,
    select: false,
  },
  photo: {
    type: String,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // this only works on SAVE!!!
      validator(el) {
        return el === this.password;
      },
      message: 'Passwords are not the same',
    },
    select: false,
  },
});

UserSchema.pre('save', async function cryptPassword(next) {
  try {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);

    this.passwordConfirm = undefined;

    return next();
  } catch (error) {
    console.log(error);
  }
});

UserSchema.methods.correctPassword = async function checkPassword(candidatePassword, userPassword) {
  const correctPassword = await bcrypt.compare(candidatePassword, userPassword);
  return correctPassword;
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
