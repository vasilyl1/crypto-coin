const { Schema } = require('mongoose');

const newsSchema = new Schema({
  textContent: {
    type: String, 
    required: true
  },
  date: {
    type: String, 
    equired: true
  },
  sources:{
    type: Schema.Types.ObjectId, 
    ref: 'Source'
  },
});


module.exports =  newsSchema;