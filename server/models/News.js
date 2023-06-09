const { Schema, model } = require('mongoose');

const newsSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    default: ''
  },
  body: {
    type: String,
    default: ''
  },
  date: {
    type: String, 
    required: true
  },
  source:{
    type: Schema.Types.ObjectId, 
    ref: 'Source'
  },
  subscription: { 
    type: String, 
    required: true, 
    default: 'free'
  }
});

const News = model('News', newsSchema);
module.exports = News; 