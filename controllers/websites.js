const express = require('express');
const { isAuthenticated } = require('../services/middleware.js');
const ROUTER = express.Router({mergeParams: true});
const Projects = require('../models/projects.js')
const WebsitesUrls = require('./websiteUrls');
ROUTER.use(isAuthenticated);
ROUTER.use('/:websiteId/urls', WebsitesUrls)
//___________________
// Project Routes
//___________________



// GET show a website
ROUTER.get('/:id', (req, res) => {
  Projects.findById(req.params.projectId, (err, foundProject) => {
    console.log(`~~~~~~~~~~~~~~~~~~~~~~`);
    console.log(`project id : ${req.params.projectId}`);
    console.log(`website id : ${req.params.websiteId}`);
    console.log(foundProject);
    console.log(`~~~~~~~~~~~~~~~~~~~~~~`);
    res.render('websites/show.ejs', {
      projects: foundProject,
    })
  })
})

module.exports = ROUTER;