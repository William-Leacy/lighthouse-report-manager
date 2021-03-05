const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new mongoose.Schema({
  name: {type: String},
  created_date: {type: Date,default: Date.now},
  creator: {type: String},
  memebers: [],
  websites: [{ type: Schema.Types.ObjectId, ref: 'Website' }]
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;





