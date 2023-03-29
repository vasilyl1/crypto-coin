const mongoose = require('mongoose');

const { Schema } = mongoose;

const subscriptionsSchema = new Schema({
  description: {type: String, required: true},
  date: {type: Number, default: 0.0, required: true},
});


module.exports =  mongoose.model('Subscription', subscriptionsSchema);