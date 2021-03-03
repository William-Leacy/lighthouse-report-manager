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


// Delete a website
ROUTER.delete('/:id', (req, res) => {
  console.log(`~~~~~~~~~~~~~~~~~~~~~~`);
  console.log("Deleting website");
  console.log(`~~~~~~~~~~~~~~~~~~~~~~`);
  Projects.findById(req.params.projectId, (err, foundProject) => {
    console.log(`~~~~~~~~~~~~~~~~~~~~~~`);
    console.log(`project id : ${req.params.projectId}`);
    console.log(`website id : ${req.params.websiteId}`);
    console.log(foundProject);
    console.log(`~~~~~~~~~~~~~~~~~~~~~~`);
    Projects.findByIdAndRemove(req.params.websiteId, { useFindAndModify: false }, (err, data)=>{
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
      res.redirect('/projects')
    })})

});
module.exports = ROUTER;