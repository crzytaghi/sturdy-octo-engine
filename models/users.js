const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Information that is sent to the database that the API requests then target when making requests to the database.
const userSchema = Schema({
  username: {type: String, unique: true, required: true},
  password: String
})

const User = mongoose.model('User', userSchema)

module.exports = User;
