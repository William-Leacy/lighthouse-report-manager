const express = require('express');
const { isAuthenticated } = require('../services/middleware.js');
const ROUTER = express.Router({mergeParams: true});
const Projects = require('../models/projects.js')

ROUTER.use(isAuthenticated);

//___________________
// Project Routes
//___________________

// GET websites Index
// ROUTER.get('/', (req, res)=>{
//   Projects.find({}, (error, allProjects)=>{
//     console.log(`~~~~~~~~~~~~~~~~~~~~~~`);
//     console.log(req.params);
//     console.log(`~~~~~~~~~~~~~~~~~~~~~~`);
//       res.render('websites/index.ejs', {
//         projects: allProjects,
//       })
//   })
// })



// GET show a project
ROUTER.get('/:id', (req, res) => {
  Projects.findById(req.params.websiteUrlId, (err, foundProject) => {
    console.log(`~~~~~~~~~~~~~~~~~~~~~~`);
    console.log(`project id : ${req.params.projectId}`);
    console.log(`website id : ${req.params.websiteId}`);
    console.log(`url id : ${req.params.websiteUrlId}`);
    console.log(foundProject);
    console.log(`~~~~~~~~~~~~~~~~~~~~~~`);
    res.render('reports/show.ejs', {
      projects: foundProject,
    })
  })
})


module.exports = ROUTER;