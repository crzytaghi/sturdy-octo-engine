// Dependencies
const bcrypt = require('bcrypt');
const express = require('express');
const User = require('../models/users.js');

const sessions = express.Router();

sessions.get('/new', (req,res) => {
  res.render('sessions/new.ejs')
});

module.exports = sessions;
