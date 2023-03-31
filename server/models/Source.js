const mongoose = require('mongoose');

const { Schema } = mongoose;

const source = new Schema({
  description: {type: String, required: true},
  http: {type: String, required: true},
});


module.exports =  mongoose.model('Source', source);
