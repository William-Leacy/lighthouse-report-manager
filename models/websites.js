const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const websitesSchema = new mongoose.Schema({
  website_name: {type: String},
  list_of_urls: [{ type: Schema.Types.ObjectId, ref: 'WebsitesUrls' }]
});

const Website = mongoose.model('Website', websitesSchema);

module.exports = Website;

