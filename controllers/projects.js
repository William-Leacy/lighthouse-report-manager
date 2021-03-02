const express = require('express');
const { isAuthenticated } = require('../services/middleware.js');
const ROUTER = express.Router();
const Projects = require('../models/projects.js')
ROUTER.use(isAuthenticated);

ROUTER.get('/seed', (req, res)=>{
  Projects.create([
    {
        name:'Website Name'
    },
  ], (err, data)=>{
      res.redirect('/projects');
  })
});

ROUTER.get('/', (req, res)=>{
  Projects.find({}, (error, allProjects)=>{
      res.render('projects/index.ejs', {
        projects: allProjects,
      })
  })
})

ROUTER.get('/new', (req, res) => {
  res.render('projects/new.ejs');
})

ROUTER.post('/', (req, res)=>{
  Projects.create(req.body, (error, createdProject)=>{
    res.redirect('/projects');
  })
})

ROUTER.get('/:id', (req, res) =>{
  Projects.findById(req.params.id, (err, foundProject)=>{
    res.render('projects/show.ejs', {
      projects: foundProject,
    })
  })
})
module.exports = ROUTER;