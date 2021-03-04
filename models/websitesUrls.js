const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const urlsSchema = new mongoose.Schema({

  url_name: {type: String},
  created_date: {type: Date,default: Date.now},
  reports: [{ type: Schema.Types.ObjectId, ref: 'reportsSchema' }]
});

const WebsitesUrls = mongoose.model('WebsitesUrls', urlsSchema);

module.exports = WebsitesUrls;
