const express = require('express');
const bcrypt = require('bcryptjs');
const ROUTER = express.Router();
const User = require('../models/users.js')

ROUTER.get('/signin', (req, res) => {
  res.render('sessions/new.ejs', {
    currentUser: req.session.currentUser
  });
});

ROUTER.post('/', (req, res) => {
  User.findOne({
    username: req.body.username
  }, (err, foundUser) => {
    if (err) {
      console.log(err);
      res.send('Database failure');
    } else if (!foundUser) {
      res.send('<h2>Username not found</h2><a href="/users/signup">Return to Sign Up page</a>');
    } else {
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        req.session.currentUser = foundUser;
        res.redirect('/projects');
      } else {
        res.send('<a href="/sessions/signin">Incorrect username or password.</a>');
      }
    }
  });
});

ROUTER.delete('/', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/sessions/signin');
  })
})

module.exports = ROUTER;