// Dependencies
const bcrypt = require('bcrypt'); // encrypts the password to ensure security and privacy
const express = require('express'); // allows express to be run on the page, similar to importing from react.
const User = require('../models/users.js'); // allows the data entered in the User model to be implemented.

// Configuration
const users = express.Router();

// Sends a get request to display the new user page. 
users.get('/new', (req,res) => {
  res.render('users/new.ejs',
    {currentUser: req.session.currentUser}
  )
});

// Create New User - Enters the information into the currentUser model in order for it to be accessed later and allow the user to sign in with the information they submitted.
users.post('/', (req,res) => {
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  User.create(req.body, (err, createdUser) => {
    // console.log('user is created', createdUser);
    res.redirect('/sessions/new');
  })
})

module.exports = users;
