const express = require('express');
const {
  isAuthenticated
} = require('../services/middleware.js');
const ROUTER = express.Router({
  mergeParams: true
});
const Projects = require('../models/projects.js')
const Website = require('../models/websites.js')
const WebsitesUrls = require('../models/websitesUrls.js')
const Reports = require('../models/reports.js')
const WebsitesReports = require('./reports');
ROUTER.use(isAuthenticated);
ROUTER.use('/:websiteUrlId/report', WebsitesReports)
//___________________
// URL Routes
//___________________
ROUTER.get('/new', (req, res) => {
  Projects.findById(req.params.projectId).then((project) => {
    Website.findById(req.params.websiteId, (err, foundWebsite) => {
      res.render('urls/new.ejs', {
        websites: foundWebsite,
        projects: project
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

// POST create a url
ROUTER.post('/', (req, res) => {
  Website.findById(req.params.websiteId).then((website) => {
    WebsitesUrls.create(req.body).then(websiteUrl => {
      website.list_of_urls.push(websiteUrl)
      website.save()
      res.redirect(`/projects/${req.params.projectId}/websites/${req.params.websiteId}`)
    })
  })
})

module.exports = ROUTER;