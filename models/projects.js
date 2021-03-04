const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new mongoose.Schema({
  name: {type: String},
  created_date: {type: Date,default: Date.now},
  creator: {type: String},
  memebers: [],
  websites: [{
    website_name: {type: String},
    list_of_urls: [{
      url_name: {type: String},
      created_date: {type: Date,default: Date.now},
      reports: [{
        report_name: {type: String},
        created_date: {type: Date,default: Date.now},
        lighthouse_json_data: {},
        lighthouse_html_string: {type: String},
        comments: [{
          text: {type: String},
          created_date: {type: Date, default: Date.now},
          createdBY: {type: Date, default: Date.now}
        }],
        creator: {type: String},
        created_date: {type: Date, default: Date.now}
      }]
    }]
  }],
})

// const projectSchema = new mongoose.Schema({
//   name: {type: String},
//   created_date: {type: Date,default: Date.now},
//   creator: {type: String},
//   memebers: [],

//     websites: [{ type: Schema.Types.ObjectId, ref: 'websitesSchema' }]
// });

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;





