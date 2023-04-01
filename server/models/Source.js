const {Schema, model } = require('mongoose');

const sourceSchema = new Schema({
  title: {type: String},
  http: {type: String}
});

const Source = model('Source', sourceSchema);
module.exports = Source;
