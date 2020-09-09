const mongoose = require('mongoose');

// Information provided to the database that is then accessed when making API requests via EJS through the REST API routes. (Get, Put, Post, Delete)
const recipeSchema = new mongoose.Schema({
  title: {type: String, required: true},
  ingredient: {type: String, required: true},
  process: {type: String, required: true},
  img: String,
  time: {type: Number, required: true},
  type: {type: String, required: true}
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
