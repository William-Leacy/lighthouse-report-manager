const express = require('express');
const { isAuthenticated } = require('../services/middleware.js');
const ROUTER = express.Router({mergeParams: true});
const Projects = require('../models/projects.js')
const Website = require('../models/websites.js')
const WebsitesUrls = require('../models/websitesUrls.js')
const Reports = require('../models/reports.js')
const WebsitesReports = require('./reports');
ROUTER.use(isAuthenticated);
ROUTER.use('/:websiteUrlId/report', WebsitesReports)
//___________________
// Project Routes
//___________________
ROUTER.get('/new', (req, res) => {
  Projects.findById(req.params.projectId).then((project) => {
    Website.findById(req.params.websiteId, (err, foundWebsite) => {
      console.log(req.params.id);
      console.log(foundWebsite);
          res.render('urls/new.ejs', {
        websites: foundWebsite,
        projects: project
        // websiteIndex: IndexForWebsite
      })
    })
    })
})

// GET show a url
ROUTER.get('/:id', (req, res) => {

  Projects.findById(req.params.projectId).then((foundProject) => {
    Website.findById(req.params.websiteId).then((foundwebsite) => {
      WebsitesUrls.findById(req.params.id, (err, foundWebsiteUrl) => {
        Reports.find({}, (err, foundReports) => {
        console.log(req.params.id);
        console.log(foundWebsiteUrl);
            res.render('urls/show.ejs', {
              websiteUrl: foundWebsiteUrl,
              website: foundwebsite,
              project: foundProject,
              report: foundReports
            })
        })
      })
      })
    })
})

// POST create a website
ROUTER.post('/', (req, res) => {

  console.log(req.body);

  Website.findById(req.params.websiteId).then((project) => {
    console.log(project)
    console.log(req.params.websiteId)
    WebsitesUrls.create(req.body).then(website => {
    project.list_of_urls.push(website)
    project.save()
    res.redirect(`/projects/${req.params.projectId}/websites/${req.params.websiteId}`)
  })
  })

})


module.exports = ROUTER;