const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportsSchema = new mongoose.Schema({
 
  report_name: {type: String},
  created_date: {type: Date, default: Date.now },
  lighthouse_json_data: {},
  lighthouse_html_string: {type: String},
  creator: {type: String},
  created_date: {type: Date, default: Date.now},
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comments' }]

});

const Reports = mongoose.model('Reports', reportsSchema);

module.exports = Reports;
