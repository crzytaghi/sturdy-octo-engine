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

// Logs the user in based on the login information provided using a post request to the database. Ensures the user stays logged in if they navigate away from the website.
sessions.post('/', (req,res) => {
  User.findOne({username: req.body.username}, (err, foundUser) => {
    if (err) {
      console.log(err);
      res.send('Issue with DB')
    } else if (!foundUser) {
      res.send('Incorrect Username and/or Password!<br/><a href="/sessions/new">Return to Sign-Up Page</a><br/><a href="/users/new">Create New User</a>')
    } else {
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        req.session.currentUser = foundUser
        res.redirect('/recipe')
      } else {
        res.send('Incorrect Username and/or Password!<br/><a href="/sessions/new">Return to Sign-Up Page</a><br/><a href="/users/new">Create New User</a>')
      }
    }
  })
})

// Deletes the users session or logs the user out using a delete request to the session.
sessions.delete('/', (req,res) => {
  req.session.destroy(() => {
    res.redirect('/')
  });
});

module.exports = sessions;
