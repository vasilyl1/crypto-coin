const mongoose = require('mongoose');

const { Schema } = mongoose;

const newsSchema = new Schema({
  textContent: {type: String, required: true},
  date: {type: String, required: true},
  sources:{type: Schema.Types.ObjectId, ref: 'News'},
});


module.exports =  mongoose.model('News', newsSchema);