const express = require('express');
const {
  isAuthenticated
} = require('../services/middleware.js');
const ROUTER = express.Router();
const Projects = require('../models/projects.js')
const Websites = require('./websites');
ROUTER.use(isAuthenticated);
ROUTER.use('/:projectId/websites', Websites)
//___________________
// Project Routes
//___________________
// GET seed project data
ROUTER.get('/seed', (req, res) => {
  Projects.create([{
      name: 'Group A Project',
      websites: [{
        website_name: "Google.com",
        list_of_urls: [{
          url_name: "www.google.com/about",
          reports: [{
            report_name: "report 1"
          },
          {
            report_name: "report 2"
          }]
        },
        {
          url_name: "www.google.com/log",
          reports: [{
            report_name: "report 1"
          },
          {
            report_name: "report 2"
          }]
        }]
      },
      {
        website_name: "Apple.com",
        list_of_urls: [{
          url_name: "www.Apple.com/about",
          reports: [{
            report_name: "report 1"
          },
          {
            report_name: "report 2"
          }]
        },
        {
          url_name: "www.Apple.com/log",
          reports: [{
            report_name: "report 1"
          },
          {
            report_name: "report 2"
          }]
        }]
      }]
    },{
      name: 'Group B Project',
      websites: [{
        website_name: "ibm.com",
        list_of_urls: [{
          url_name: "www.ibm.com/about",
          reports: [{
            report_name: "report 1"
          },
          {
            report_name: "report 2"
          }]
        },
        {
          url_name: "www.ibm.com/log",
          reports: [{
            report_name: "report 1"
          },
          {
            report_name: "report 2"
          }]
        }]
      },
      {
        website_name: "facebook.com",
        list_of_urls: [{
          url_name: "www.facebook.com/about",
          reports: [{
            report_name: "report 1"
          },
          {
            report_name: "report 2"
          }]
        },
        {
          url_name: "www.facebook.com/log",
          reports: [{
            report_name: "report 1"
          },
          {
            report_name: "report 2"
          }]
        }]
      }]
    }
  ], (err, data) => {
    res.redirect('/projects');
  })
});
// GET Projects Index
ROUTER.get('/', (req, res) => {

  Projects.find({}, (error, allProjects) => {
    console.log(allProjects);
    console.log(`~~~~~~~~~~~~~~~~~~~~~~`);
    console.log("Getting Projects");
    console.log(`~~~~~~~~~~~~~~~~~~~~~~`);
    res.render('projects/index.ejs', {
      projects: allProjects,

    })
  })
})
// GET new project form
ROUTER.get('/new', (req, res) => {
  res.render('projects/new.ejs');
})
// POST create a project
ROUTER.post('/', (req, res) => {
  Projects.create(req.body, (error, createdProject) => {
    res.redirect('/projects');
  })
})
// GET show a project
ROUTER.get('/:id', (req, res) => {
  console.log(`~~~~~~~~~~~~~~~~~~~~~~`);
  console.log("Showing Projects");
  console.log(`~~~~~~~~~~~~~~~~~~~~~~`);
  Projects.findById(req.params.id, (err, foundProject) => {
    console.log(foundProject);
    console.log(foundProject.websites);
    res.render('projects/show.ejs', {
      project: foundProject,
    })
  })
})

// GET edit a project
ROUTER.get('/:id/edit', (req, res)=>{
  Projects.findById(req.params.id, (err, foundProject)=>{ 
      res.render('projects/edit.ejs', { 
        projects: foundProject, 
        method: 'PUT'
      })
  })
})

// update
ROUTER.put('/:id', (req, res)=>{

  Projects.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedModel)=> {
    res.redirect('/projects');
  })
})

//Delete a project
ROUTER.delete('/:id', (req, res) => {
  Projects.findByIdAndRemove(req.params.id, { useFindAndModify: false }, (err, data)=>{
    res.redirect('/projects')
  })
});

module.exports = ROUTER;