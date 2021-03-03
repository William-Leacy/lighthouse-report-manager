const express = require('express');
const { isAuthenticated } = require('../services/middleware.js');
const ROUTER = express.Router({mergeParams: true});
const Projects = require('../models/projects.js')
const WebsitesReports = require('./reports');
ROUTER.use(isAuthenticated);
ROUTER.use('/:websiteUrlId/report', WebsitesReports)
//___________________
// Project Routes
//___________________


// GET show a url
ROUTER.get('/:id', (req, res) => {
  Projects.findById(req.params.projectId,(err, foundProject) => {
    let urlIndexForWebsite = 0;
    console.log(`~~~~~~~~~~~~~~~~~~~~~~`);
    console.log(`project id : ${req.params.projectId}`);
    console.log(`website id : ${req.params.websiteId}`);
    for (const id in foundProject.websites) {
      console.log(foundProject.websites[id].id);
      if (foundProject.websites[id].id == req.params.websiteId) {
        urlIndexForWebsite = id;
        console.log(id);
        console.log("found");
      } else {
      }    
    }
    console.log(foundProject.websites.indexOf(req.params.websiteId));
    console.log(`~~~~~~~~~~~~~~~~~~~~~~`);
    res.render('urls/show.ejs', {
      projects: foundProject,
      websiteUrlIndex: urlIndexForWebsite
    })
  })
})

module.exports = ROUTER;