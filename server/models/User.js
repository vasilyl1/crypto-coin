const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const News = require('./News');

const userSchema = new Schema({
  username: {
    type: String, 
    required: true, 
    unique: true 
  },
  email: {
    type: String, 
    required: true, 
    unique: true,
    match: [/.+@.+\..+/, 'Must use a valid email address'],
  },
  password: {
    type: String, 
    required: true, 
    minlength: 5
  },
  subscribe_level: {
    type: String,
    enum: ['free', 'intermediate', 'advanced'],
    default: 'free',
},
  personalNews: [News.schema],
});

userSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports =  model('User', userSchema);;