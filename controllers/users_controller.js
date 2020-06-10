// Dependencies
const bcrypt = require('bcrypt');
const express = require('express');
const User = require('../models/users.js');

// Configuration
const users = express.Router();

users.get('/new', (req,res) => {
  res.render('users/new.ejs',
    {currentUser: req.session.currentUser}
  )
});

// Creating a user
users.post('/', (req,res) => {
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  User.create(req.body, (err, createdUser) => {
    // console.log('user is created', createdUser);
    res.redirect('/sessions/new');
  })
})

module.exports = users;
