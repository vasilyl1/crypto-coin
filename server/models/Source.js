const { Schema } = mongoose;

const sourceSchema = new Schema({
  description: {type: String, required: true},
  http: {type: String, required: true},
});

module.exports =  mongoose.model('Source', sourceSchema);