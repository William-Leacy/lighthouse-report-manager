//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const session = require('express-session');
const {logRequest} = require('./services/middleware.js');
require('dotenv').config();
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/'+ `lighthouse_report_project`;

// Connect to Mongo
mongoose.connect(MONGODB_URI ,  { useNewUrlParser: true});

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

// open the connection to mongo
db.on('open' , ()=>{});

//___________________
//controller logic
//___________________
const sessionsController = require('./controllers/sessions.js');
const usersController = require('./controllers/users.js');
const projectsController = require('./controllers/projects.js');
const websitesController = require('./controllers/websites.js');
const websiteUrlsController = require('./controllers/websiteUrls.js');
const websiteReportsController = require('./controllers/reports.js');
//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form

app.use(
  session(
    {
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: false,
    }
  )
);
app.use(logRequest);

// Register our controllers on their routes
app.use('/sessions', sessionsController);
app.use('/users', usersController);
app.use('/projects', projectsController);
app.use('/websites', websitesController);
app.use('/urls', websiteUrlsController);
app.use('/report', websiteReportsController);


//___________________
// Routes
//___________________
//localhost:3000
// app.get('/' , (req, res) => {
//   res.send('Hello World!');
// });

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));