// Dependencies
const bcrypt = require('bcrypt');
const express = require('express');
const User = require('../models/users.js');

// Configuration
const users = express.Router();

users.get('/new', (req,res) => {
  res.render('users/new.ejs')
});

module.exports = users;
