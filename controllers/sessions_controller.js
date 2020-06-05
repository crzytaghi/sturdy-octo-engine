// Dependencies
const bcrypt = require('bcrypt');
const express = require('express');
const User = require('../models/users.js');

const sessions = express.Router();

sessions.get('/new', (req,res) => {
  res.render('sessions/new.ejs',
    {currentUser: req.session.currentUser}
  )
});

sessions.post('/', (req,res) => {
  User.findOne({username: req.body.username}, (err, foundUser) => {
    if (err) {
      console.log(err);
      res.send('Issue with DB')
    } else if (!foundUser) {
      res.send('User Not Found!<a href="/recipe">Return to Home Page</a>')
    } else {
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        req.session.currentUser = foundUser
        res.redirect('/recipe')
      } else {
        res.send('Incorrect Password!<a href="/recipe">Return to Home Page</a>')
      }
    }
  })
})

sessions.delete('/', (req,res) => {
  req.session.destroy(() => {
    res.redirect('/')
  });
});

module.exports = sessions;
