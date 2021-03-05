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

// Light House config
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

ROUTER.use(isAuthenticated);

//___________________
// Reoprts Routes
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
        })
      })
    })
  })
})

// GET show a Report
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
          })
        })
      })
    })
  })
})

/*
 * The codeblock below is taken from the lighthouse docs and modified to store
 * the result from chrome console lighthouse report to request body where it will
 * be stored to a report when created
 */

/*
 * Author: Lighthouse,
 * Date: 04/03/2021
 * Title of program: Lighthouse
 * Type: (source code)
 * publisher: Lighthouse,
 *
 * Single line Referecne: https://github.com/GoogleChrome/lighthouse/blob/HEAD/docs/readme.md#using-programmatically
 */

// POST create a report
ROUTER.post('/', (req, res) => {
  (async () => {
    console.log("tesdsfgt");
    const chrome = await chromeLauncher.launch({
      chromeFlags: ['--headless']
    });
    const options = {
      logLevel: 'info',
      output: 'html',
      port: chrome.port
    };
    const runnerResult = await lighthouse(req.body.report_url, options);

    // `.report` is the HTML report as a string
    const reportHtml = runnerResult.report;
    req.body.lighthouse_html_string = reportHtml;

    // `.lhr` is the Lighthouse Result as a JS object
    console.log('Report is done for', runnerResult.lhr.finalUrl);
    console.log('Performance score was', runnerResult.lhr.categories.performance.score * 100);

    await chrome.kill();

    WebsitesUrls.findById(req.params.websiteUrlId).then((websiteUrl) => {
      Reports.create(req.body).then(report => {
        websiteUrl.reports.push(report)
        websiteUrl.save()
        res.redirect(`/projects/${req.params.projectId}/websites/${req.params.websiteId}/urls/${req.params.websiteUrlId}`)
      })
    })
  })();
})

module.exports = ROUTER;