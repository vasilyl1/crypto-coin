const mongoose = require('mongoose');

const { Schema } = mongoose;

const newsSchema = new Schema({
  textContent: {
    type: String, 
    required: true
  },
  date: {
    type: Date, 
    required: true
  },
  source:{
    type: Schema.Types.ObjectId, 
    ref: 'Source'
  },
});


module.exports = mongoose.model('News', newsSchema); 