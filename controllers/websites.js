const express = require('express');
const {
  isAuthenticated
} = require('../services/middleware.js');
const ROUTER = express.Router({
  mergeParams: true
});
const Projects = require('../models/projects.js')
const Website = require('../models/websites.js')
const WebsitesUrl = require('../models/websitesUrls.js')
const WebsitesUrls = require('./websiteUrls');
ROUTER.use(isAuthenticated);
ROUTER.use('/:websiteId/urls', WebsitesUrls)
//___________________
// WEBSITES Routes
//___________________
// GET new website
ROUTER.get('/new', (req, res) => {
  Projects.findById(req.params.projectId, (err, foundProject) => {
    res.render('websites/new.ejs', {
      projects: foundProject,
    })
  })
})

// GET show a website
ROUTER.get('/:id', (req, res) => {
  Projects.findById(req.params.projectId).then((project) => {
    Website.findById(req.params.id, (err, foundWebsite) => {
      WebsitesUrl.find({}, (err, foundWebsitesUrl) => {
        res.render('websites/show.ejs', {
          websites: foundWebsite,
          projects: project,
          websitesUrl: foundWebsitesUrl
        })
      })
    })
  })
})

// POST create a website
ROUTER.post('/', (req, res) => {
  Projects.findById(req.params.projectId).then((project) => {
    Website.create(req.body).then(website => {
      project.websites.push(website)
      project.save()
      res.redirect(`/projects/${req.params.projectId}`)
    })
  })
})
// GET edit a website
ROUTER.get('/:id/edit', (req, res) => {
  Projects.findById(req.params.projectId, (err, foundProject) => {
    let IndexForWebsite = 0;
    for (const id in foundProject.websites) {
      console.log(foundProject.websites[id].id);
      if (foundProject.websites[id].id == req.params.id) {
        IndexForWebsite = id;
        console.log(id);
        console.log("found");
      } else {}
    }
    res.render('websites/edit.ejs', {
      projects: foundProject,
      method: 'PUT',
      websiteIndex: IndexForWebsite
    })
  })
})

// PUT Update website
ROUTER.put('/:id', (req, res) => {
  console.log(req.params);
  console.log(req.body);
  Projects.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  }, (err, updatedModel) => {
    res.redirect(`/projects/${req.params.projectId}`)
  })
})

// Delete a website
ROUTER.delete('/:id', (req, res) => {
  console.log(`~~~~~~~~~~~~~~~~~~~~~~`);
  console.log("Deleting website");
  console.log(`~~~~~~~~~~~~~~~~~~~~~~`);
  Website.findByIdAndRemove(req.params.id, {
    useFindAndModify: false
  }, (err, data) => {
    console.log(req.params.id);
    res.redirect('/projects')
  })
})

module.exports = ROUTER;