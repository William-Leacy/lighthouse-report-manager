const express = require('express');
const { isAuthenticated } = require('../services/middleware.js');
const ROUTER = express.Router({mergeParams: true});
const Projects = require('../models/projects.js')
const Website = require('../models/websites.js')
const WebsitesUrls = require('../models/websitesUrls.js')
const Reports = require('../models/reports.js')


// Light House config
const fs = require('fs');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');



ROUTER.use(isAuthenticated);

//___________________
// Project Routes
//___________________


ROUTER.get('/new', (req, res) => {
  Projects.findById(req.params.projectId).then((project) => {
    Website.findById(req.params.websiteId, (err, foundWebsite) => {
      WebsitesUrls.findById(req.params.websiteUrlId, (err, foundWebsiteUrl) => {
      console.log(req.params.id);
      console.log(foundWebsite);
          res.render('reports/new.ejs', {
        websites: foundWebsite,
        projects: project,
        url: foundWebsiteUrl
        // websiteIndex: IndexForWebsite
      })
    })
    })
  })
})

// GET show a url
ROUTER.get('/:id', (req, res) => {

  Projects.findById(req.params.projectId).then((foundProject) => {
    Website.findById(req.params.websiteId).then((foundwebsite) => {
      WebsitesUrls.findById(req.params.websiteUrlId, (err, foundWebsiteUrl) => {
        Reports.findById(req.params.id, (err, foundReport) => {
        console.log(req.params.id);
        console.log(foundWebsiteUrl);
            res.render('reports/show.ejs', {
              websiteUrl: foundWebsiteUrl,
              website: foundwebsite,
              project: foundProject,
              report: foundReport
          // websiteIndex: IndexForWebsite
        })
      })
      })
      })
    })
})

// POST create a website
ROUTER.post('/', (req, res) => {


  console.log("test");
    (async () => {
      console.log("tesdsfgt");
      // const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
      // const options = {logLevel: 'info', output: 'html', port: chrome.port};
      const runnerResult = await lighthouse( req.body.report_url, options);

      // `.report` is the HTML report as a string
      const reportHtml = runnerResult.report;
      fs.writeFileSync('lhreport.html', reportHtml);
    
      // `.lhr` is the Lighthouse Result as a JS object
      console.log('Report is done for', runnerResult.lhr.finalUrl);
      console.log('Performance score was', runnerResult.lhr.categories.performance.score * 100);
    
      // await chrome.kill();
   
  

  console.log(req.body);
  // console.log(reportHtml);
  req.body.lighthouse_html_string = reportHtml;
  console.log(req.body);

  WebsitesUrls.findById(req.params.websiteUrlId).then((project) => {
    console.log(project)
    console.log(req.params.websiteId)
    Reports.create(req.body).then(website => {
    project.reports.push(website)
    project.save()
    res.send(website)
  })
  })

})();
})


module.exports = ROUTER;