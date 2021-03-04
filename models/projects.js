const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new mongoose.Schema({
  name: {type: String},
  created_date: {type: Date,default: Date.now},
  creator: {type: String,},
  memebers: [],
  websites: [{
    website_name: {type: String,},
    list_of_urls: [{
      url_name: {type: String,},
      created_date: {type: Date,default: Date.now},
      reports: [{
        report_name: {type: String,},
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
//   creator: {type: String,},
//   memebers: [],
//   websites: [{ type: Schema.Types.ObjectId, ref: 'websitesSchema' }]
// });

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;






// const websitesSchema = new mongoose.Schema({
//   website_name: {type: String,},
//   list_of_urls: { type: Schema.Types.ObjectId, ref: 'urlsSchema' }
// });

// const urlsSchema = new mongoose.Schema({

//     url_name: {type: String,},
//     created_date: {type: Date,default: Date.now},
//     reports: { type: Schema.Types.ObjectId, ref: 'reportsSchema' }
// });

// const reportsSchema = new mongoose.Schema({
 
//     report_name: {
//       type: String,
//     },
//     created_date: {
//       type: Date,
//       default: Date.now
//     },
//     lighthouse_json_data: {},
//     lighthouse_html_string: {
//       type: String,
//     },
//     memebers: [],
//     creator: {type: String},
//     created_date: {type: Date, default: Date.now},
//     comments: { type: Schema.Types.ObjectId, ref: 'commentsSchema' }

//   });

// const commentsSchema = new mongoose.Schema({
//     text: {
//       type: String,
//     },
//     created_date: {
//       type: Date,
//       default: Date.now
//     },
//     createdBY: {
//       type: Date,
//       default: Date.now
//     }

//   });